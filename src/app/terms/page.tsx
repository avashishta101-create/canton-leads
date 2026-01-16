import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { FileText, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Canton Mobile Detail Pros',
  description: 'Terms of Service for Canton Mobile Detail Pros lead connection platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-400">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-lg">
          <CardContent className="pt-8 pb-8 sm:px-10">
            {/* Section 1 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">1</Badge>
                <h2 className="text-xl font-bold text-slate-900">Service Description</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Canton Mobile Detail Pros (&quot;we,&quot; &quot;us,&quot; or &quot;the Platform&quot;) is a lead
                connection platform that connects customers seeking mobile auto detailing services
                with independent local service providers (&quot;Businesses&quot;). We are not a mobile auto
                detailing company and do not provide detailing services directly.
              </p>
              <p className="text-slate-600 leading-relaxed mt-3">
                For Businesses, we provide a monthly lead access subscription service that delivers
                customer inquiries (&quot;Leads&quot;) to subscribed Businesses based on ZIP code territory
                claims.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 2 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">2</Badge>
                <h2 className="text-xl font-bold text-slate-900">Business Subscription Terms</h2>
              </div>

              <div className="space-y-4">
                <Card className="bg-slate-50 border-0">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">2.1 Monthly Lead Access</h3>
                    <p className="text-slate-600">
                      The subscription provides access to customer leads routed to your claimed ZIP code
                      territories. This is a monthly lead access service, not a per-lead purchase. Lead
                      volume may vary based on customer demand and advertising performance.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50 border-0">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">2.2 Minimum Delivery Guarantee</h3>
                    <p className="text-slate-600">
                      We target a minimum delivery of 10 leads per calendar month. If the minimum is not
                      met within a calendar month, your subscription period will be extended until the
                      minimum is satisfied. <strong>No refunds are issued</strong> for unmet minimums;
                      delivery extension is the sole remedy.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50 border-0">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">2.3 ZIP Code Exclusivity</h3>
                    <p className="text-slate-600">
                      Each ZIP code can only be claimed by one Business at a time. ZIP code claims are
                      granted on a first-come, first-served basis. Exclusivity applies only while your
                      subscription is active and in good standing.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50 border-0">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">2.4 Pricing</h3>
                    <p className="text-slate-600">
                      The current subscription price is $399 per month. Prices may change with 30 days&apos;
                      notice. Price changes do not affect the current billing cycle.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50 border-0">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">2.5 Billing</h3>
                    <p className="text-slate-600">
                      Subscriptions are billed monthly via Stripe. Your subscription automatically renews
                      each month unless canceled. You authorize us to charge your payment method on file
                      for recurring subscription fees.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="mb-10" />

            {/* Section 3 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">3</Badge>
                <h2 className="text-xl font-bold text-slate-900">Cancellation and Refund Policy</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                You may cancel your subscription at any time through your Stripe account or by
                contacting us. Upon cancellation:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  'Your subscription remains active through the end of the current billing cycle',
                  'No refunds are provided for partial months or unused portions',
                  'Your ZIP code claims will be released and made available to other Businesses',
                  'You will no longer receive new leads after your subscription ends',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
              <Alert className="mt-6 border-amber-200 bg-amber-50">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <strong>No Refunds:</strong> All subscription payments are non-refundable. If lead
                  minimums are not met, delivery will be extended as described in Section 2.2.
                </AlertDescription>
              </Alert>
            </section>

            <Separator className="mb-10" />

            {/* Section 4 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">4</Badge>
                <h2 className="text-xl font-bold text-slate-900">Lead Quality and Delivery</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We make reasonable efforts to deliver qualified leads, but we do not guarantee:
              </p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                  The accuracy or completeness of lead information
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                  That leads will convert to paying customers
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                  Any specific volume of leads beyond the minimum delivery commitment
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                  The responsiveness or intent of customers who submit inquiries
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                Businesses are solely responsible for following up with leads and converting them
                into customers. We provide lead information only and have no involvement in the
                service relationship between Businesses and their customers.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 5 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">5</Badge>
                <h2 className="text-xl font-bold text-slate-900">No Income Claims</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We make no representations or guarantees regarding potential income, revenue, or
                business results from using our platform. Your results depend on many factors
                including your responsiveness, service quality, pricing, and market conditions.
                Past performance of other subscribers does not guarantee future results.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 6 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">6</Badge>
                <h2 className="text-xl font-bold text-slate-900">Customer Terms</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                For customers submitting lead requests: By submitting a request through our platform,
                you consent to be contacted by phone, text message, and/or email by an independent
                local service provider regarding your detailing request. We share your contact
                information with the assigned provider to facilitate this connection.
              </p>
              <p className="text-slate-600 leading-relaxed mt-3">
                We are not responsible for the quality, pricing, or availability of services
                provided by independent Businesses.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 7 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">7</Badge>
                <h2 className="text-xl font-bold text-slate-900">Prohibited Conduct</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">Users of this platform agree not to:</p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                  Submit false or misleading information
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                  Attempt to manipulate or abuse the lead system
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                  Use the platform for any unlawful purpose
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                  Resell or redistribute leads received through the platform
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                  Violate any applicable laws or regulations
                </li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Section 8 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">8</Badge>
                <h2 className="text-xl font-bold text-slate-900">Disclaimer of Warranties</h2>
              </div>
              <Card className="bg-slate-100 border-0">
                <CardContent className="pt-5 pb-5">
                  <p className="text-sm text-slate-700 uppercase">
                    THE PLATFORM IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY
                    KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING MERCHANTABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="mb-10" />

            {/* Section 9 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">9</Badge>
                <h2 className="text-xl font-bold text-slate-900">Limitation of Liability</h2>
              </div>
              <Card className="bg-slate-100 border-0">
                <CardContent className="pt-5 pb-5">
                  <p className="text-sm text-slate-700 uppercase">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
                    INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF
                    THE PLATFORM. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE
                    PRECEDING 12 MONTHS.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="mb-10" />

            {/* Section 10 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">10</Badge>
                <h2 className="text-xl font-bold text-slate-900">Modifications</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. Material changes will be
                communicated via email or platform notification. Continued use of the platform
                after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 11 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">11</Badge>
                <h2 className="text-xl font-bold text-slate-900">Contact</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                For questions about these Terms, please contact us at:{' '}
                <a
                  href="mailto:cantondetailingpros@gmail.com"
                  className="text-blue-500 hover:underline font-medium"
                >
                  cantondetailingpros@gmail.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
