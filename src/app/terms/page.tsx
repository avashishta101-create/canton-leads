import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Canton Mobile Detail Pros',
  description: 'Terms of Service for Canton Mobile Detail Pros lead connection platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="text-sm text-gray-500 mb-6">Last updated: January 2025</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Service Description</h2>
            <p>
              Canton Mobile Detail Pros (&quot;we,&quot; &quot;us,&quot; or &quot;the Platform&quot;) is a lead
              connection platform that connects customers seeking mobile auto detailing services
              with independent local service providers (&quot;Businesses&quot;). We are not a mobile auto
              detailing company and do not provide detailing services directly.
            </p>
            <p className="mt-3">
              For Businesses, we provide a monthly lead access subscription service that delivers
              customer inquiries (&quot;Leads&quot;) to subscribed Businesses based on ZIP code territory
              claims.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Business Subscription Terms
            </h2>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.1 Monthly Lead Access</h3>
            <p>
              The subscription provides access to customer leads routed to your claimed ZIP code
              territories. This is a monthly lead access service, not a per-lead purchase. Lead
              volume may vary based on customer demand and advertising performance.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
              2.2 Minimum Delivery Guarantee
            </h3>
            <p>
              We target a minimum delivery of 10 leads per calendar month. If the minimum is not
              met within a calendar month, your subscription period will be extended until the
              minimum is satisfied. <strong>No refunds are issued</strong> for unmet minimums;
              delivery extension is the sole remedy.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.3 ZIP Code Exclusivity</h3>
            <p>
              Each ZIP code can only be claimed by one Business at a time. ZIP code claims are
              granted on a first-come, first-served basis. Exclusivity applies only while your
              subscription is active and in good standing.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.4 Pricing</h3>
            <p>
              The current subscription price is $399 per month. Prices may change with 30 days&apos;
              notice. Price changes do not affect the current billing cycle.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.5 Billing</h3>
            <p>
              Subscriptions are billed monthly via Stripe. Your subscription automatically renews
              each month unless canceled. You authorize us to charge your payment method on file
              for recurring subscription fees.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Cancellation and Refund Policy
            </h2>
            <p>
              You may cancel your subscription at any time through your Stripe account or by
              contacting us. Upon cancellation:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Your subscription remains active through the end of the current billing cycle</li>
              <li>No refunds are provided for partial months or unused portions</li>
              <li>Your ZIP code claims will be released and made available to other Businesses</li>
              <li>You will no longer receive new leads after your subscription ends</li>
            </ul>
            <p className="mt-3">
              <strong>No Refunds:</strong> All subscription payments are non-refundable. If lead
              minimums are not met, delivery will be extended as described in Section 2.2.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Lead Quality and Delivery</h2>
            <p>
              We make reasonable efforts to deliver qualified leads, but we do not guarantee:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>The accuracy or completeness of lead information</li>
              <li>That leads will convert to paying customers</li>
              <li>Any specific volume of leads beyond the minimum delivery commitment</li>
              <li>The responsiveness or intent of customers who submit inquiries</li>
            </ul>
            <p className="mt-3">
              Businesses are solely responsible for following up with leads and converting them
              into customers. We provide lead information only and have no involvement in the
              service relationship between Businesses and their customers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. No Income Claims</h2>
            <p>
              We make no representations or guarantees regarding potential income, revenue, or
              business results from using our platform. Your results depend on many factors
              including your responsiveness, service quality, pricing, and market conditions.
              Past performance of other subscribers does not guarantee future results.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Customer Terms</h2>
            <p>
              For customers submitting lead requests: By submitting a request through our platform,
              you consent to be contacted by phone, text message, and/or email by an independent
              local service provider regarding your detailing request. We share your contact
              information with the assigned provider to facilitate this connection.
            </p>
            <p className="mt-3">
              We are not responsible for the quality, pricing, or availability of services
              provided by independent Businesses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Prohibited Conduct</h2>
            <p>Users of this platform agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Submit false or misleading information</li>
              <li>Attempt to manipulate or abuse the lead system</li>
              <li>Use the platform for any unlawful purpose</li>
              <li>Resell or redistribute leads received through the platform</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Disclaimer of Warranties
            </h2>
            <p>
              THE PLATFORM IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY
              KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF
              THE PLATFORM. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE
              PRECEDING 12 MONTHS.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Modifications</h2>
            <p>
              We reserve the right to modify these Terms at any time. Material changes will be
              communicated via email or platform notification. Continued use of the platform
              after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact</h2>
            <p>
              For questions about these Terms, please contact us at:{' '}
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
