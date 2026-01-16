import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Canton Mobile Detail Pros',
  description: 'Terms of Service for Canton Mobile Detail Pros lead connection platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="hero-gradient py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Terms of Service</h1>
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
                Service Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Canton Mobile Detail Pros (&quot;we,&quot; &quot;us,&quot; or &quot;the Platform&quot;) is a lead
                connection platform that connects customers seeking mobile auto detailing services
                with independent local service providers (&quot;Businesses&quot;). We are not a mobile auto
                detailing company and do not provide detailing services directly.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                For Businesses, we provide a monthly lead access subscription service that delivers
                customer inquiries (&quot;Leads&quot;) to subscribed Businesses based on ZIP code territory
                claims.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Business Subscription Terms
              </h2>

              <div className="bg-gray-50 rounded-xl p-5 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2.1 Monthly Lead Access</h3>
                <p className="text-gray-600">
                  The subscription provides access to customer leads routed to your claimed ZIP code
                  territories. This is a monthly lead access service, not a per-lead purchase. Lead
                  volume may vary based on customer demand and advertising performance.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2.2 Minimum Delivery Guarantee</h3>
                <p className="text-gray-600">
                  We target a minimum delivery of 10 leads per calendar month. If the minimum is not
                  met within a calendar month, your subscription period will be extended until the
                  minimum is satisfied. <strong>No refunds are issued</strong> for unmet minimums;
                  delivery extension is the sole remedy.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2.3 ZIP Code Exclusivity</h3>
                <p className="text-gray-600">
                  Each ZIP code can only be claimed by one Business at a time. ZIP code claims are
                  granted on a first-come, first-served basis. Exclusivity applies only while your
                  subscription is active and in good standing.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2.4 Pricing</h3>
                <p className="text-gray-600">
                  The current subscription price is $399 per month. Prices may change with 30 days&apos;
                  notice. Price changes do not affect the current billing cycle.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2.5 Billing</h3>
                <p className="text-gray-600">
                  Subscriptions are billed monthly via Stripe. Your subscription automatically renews
                  each month unless canceled. You authorize us to charge your payment method on file
                  for recurring subscription fees.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Cancellation and Refund Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You may cancel your subscription at any time through your Stripe account or by
                contacting us. Upon cancellation:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  'Your subscription remains active through the end of the current billing cycle',
                  'No refunds are provided for partial months or unused portions',
                  'Your ZIP code claims will be released and made available to other Businesses',
                  'You will no longer receive new leads after your subscription ends',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                <p className="text-amber-800 text-sm">
                  <strong>No Refunds:</strong> All subscription payments are non-refundable. If lead
                  minimums are not met, delivery will be extended as described in Section 2.2.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Lead Quality and Delivery
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We make reasonable efforts to deliver qualified leads, but we do not guarantee:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  The accuracy or completeness of lead information
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  That leads will convert to paying customers
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  Any specific volume of leads beyond the minimum delivery commitment
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  The responsiveness or intent of customers who submit inquiries
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Businesses are solely responsible for following up with leads and converting them
                into customers. We provide lead information only and have no involvement in the
                service relationship between Businesses and their customers.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                No Income Claims
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We make no representations or guarantees regarding potential income, revenue, or
                business results from using our platform. Your results depend on many factors
                including your responsiveness, service quality, pricing, and market conditions.
                Past performance of other subscribers does not guarantee future results.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Customer Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                For customers submitting lead requests: By submitting a request through our platform,
                you consent to be contacted by phone, text message, and/or email by an independent
                local service provider regarding your detailing request. We share your contact
                information with the assigned provider to facilitate this connection.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                We are not responsible for the quality, pricing, or availability of services
                provided by independent Businesses.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Prohibited Conduct
              </h2>
              <p className="text-gray-600 leading-relaxed">Users of this platform agree not to:</p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  Submit false or misleading information
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  Attempt to manipulate or abuse the lead system
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  Use the platform for any unlawful purpose
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  Resell or redistribute leads received through the platform
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  Violate any applicable laws or regulations
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">8</span>
                Disclaimer of Warranties
              </h2>
              <div className="bg-gray-100 rounded-xl p-5 text-sm text-gray-700 uppercase">
                THE PLATFORM IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY
                KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">9</span>
                Limitation of Liability
              </h2>
              <div className="bg-gray-100 rounded-xl p-5 text-sm text-gray-700 uppercase">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF
                THE PLATFORM. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE
                PRECEDING 12 MONTHS.
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">10</span>
                Modifications
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. Material changes will be
                communicated via email or platform notification. Continued use of the platform
                after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">11</span>
                Contact
              </h2>
              <p className="text-gray-600 leading-relaxed">
                For questions about these Terms, please contact us at:{' '}
                <a
                  href="mailto:cantondetailingpros@gmail.com"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  cantondetailingpros@gmail.com
                </a>
              </p>
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
