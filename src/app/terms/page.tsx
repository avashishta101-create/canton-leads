import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Canton Mobile Detail Pros',
  description: 'Terms of Service for Canton Mobile Detail Pros lead connection platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full filter blur-[128px]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/30">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-400">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="glass-dark border-slate-700/50 shadow-2xl">
          <CardContent className="pt-8 pb-8 sm:px-10">
            {/* Section 1 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">1</Badge>
                <h2 className="text-xl font-bold text-white">Service Description</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Canton Mobile Detail Pros (&quot;we,&quot; &quot;us,&quot; or &quot;the Platform&quot;) is a lead
                connection platform that connects customers seeking mobile auto detailing services
                with independent local service providers (&quot;Businesses&quot;). We are not a mobile auto
                detailing company and do not provide detailing services directly.
              </p>
              <p className="text-slate-400 leading-relaxed mt-3">
                For Businesses, we provide a monthly lead access subscription service that delivers
                customer inquiries (&quot;Leads&quot;) to subscribed Businesses based on ZIP code territory
                claims.
              </p>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 2 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">2</Badge>
                <h2 className="text-xl font-bold text-white">Business Subscription Terms</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: '2.1 Monthly Lead Access',
                    content: 'The subscription provides access to customer leads routed to your claimed ZIP code territories. This is a monthly lead access service, not a per-lead purchase. Lead volume may vary based on customer demand and advertising performance.',
                  },
                  {
                    title: '2.2 Minimum Delivery Guarantee',
                    content: 'We target a minimum delivery of 10 leads per calendar month. If the minimum is not met within a calendar month, your subscription period will be extended until the minimum is satisfied. No refunds are issued for unmet minimums; delivery extension is the sole remedy.',
                  },
                  {
                    title: '2.3 ZIP Code Exclusivity',
                    content: 'Each ZIP code can only be claimed by one Business at a time. ZIP code claims are granted on a first-come, first-served basis. Exclusivity applies only while your subscription is active and in good standing.',
                  },
                  {
                    title: '2.4 Pricing',
                    content: 'The current subscription price is $399 per month. Prices may change with 30 days\' notice. Price changes do not affect the current billing cycle.',
                  },
                  {
                    title: '2.5 Billing',
                    content: 'Subscriptions are billed monthly via Stripe. Your subscription automatically renews each month unless canceled. You authorize us to charge your payment method on file for recurring subscription fees.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.content}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 3 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">3</Badge>
                <h2 className="text-xl font-bold text-white">Cancellation and Refund Policy</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
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
                    <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-400">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-300 text-sm">
                    <span className="font-semibold">No Refunds:</span> All subscription payments are non-refundable. If lead
                    minimums are not met, delivery will be extended as described in Section 2.2.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 4 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">4</Badge>
                <h2 className="text-xl font-bold text-white">Lead Quality and Delivery</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                We make reasonable efforts to deliver qualified leads, but we do not guarantee:
              </p>
              <ul className="mt-4 space-y-2 text-slate-400">
                {[
                  'The accuracy or completeness of lead information',
                  'That leads will convert to paying customers',
                  'Any specific volume of leads beyond the minimum delivery commitment',
                  'The responsiveness or intent of customers who submit inquiries',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-slate-400 leading-relaxed mt-4">
                Businesses are solely responsible for following up with leads and converting them
                into customers. We provide lead information only and have no involvement in the
                service relationship between Businesses and their customers.
              </p>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 5 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">5</Badge>
                <h2 className="text-xl font-bold text-white">No Income Claims</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                We make no representations or guarantees regarding potential income, revenue, or
                business results from using our platform. Your results depend on many factors
                including your responsiveness, service quality, pricing, and market conditions.
                Past performance of other subscribers does not guarantee future results.
              </p>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 6 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">6</Badge>
                <h2 className="text-xl font-bold text-white">Customer Terms</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                For customers submitting lead requests: By submitting a request through our platform,
                you consent to be contacted by phone, text message, and/or email by an independent
                local service provider regarding your detailing request. We share your contact
                information with the assigned provider to facilitate this connection.
              </p>
              <p className="text-slate-400 leading-relaxed mt-3">
                We are not responsible for the quality, pricing, or availability of services
                provided by independent Businesses.
              </p>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 7 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">7</Badge>
                <h2 className="text-xl font-bold text-white">Prohibited Conduct</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">Users of this platform agree not to:</p>
              <ul className="mt-4 space-y-2 text-slate-400">
                {[
                  'Submit false or misleading information',
                  'Attempt to manipulate or abuse the lead system',
                  'Use the platform for any unlawful purpose',
                  'Resell or redistribute leads received through the platform',
                  'Violate any applicable laws or regulations',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 8 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">8</Badge>
                <h2 className="text-xl font-bold text-white">Disclaimer of Warranties</h2>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
                <p className="text-sm text-slate-400 uppercase">
                  THE PLATFORM IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY
                  KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING MERCHANTABILITY,
                  FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </div>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 9 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">9</Badge>
                <h2 className="text-xl font-bold text-white">Limitation of Liability</h2>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
                <p className="text-sm text-slate-400 uppercase">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF
                  THE PLATFORM. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE
                  PRECEDING 12 MONTHS.
                </p>
              </div>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 10 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">10</Badge>
                <h2 className="text-xl font-bold text-white">Modifications</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                We reserve the right to modify these Terms at any time. Material changes will be
                communicated via email or platform notification. Continued use of the platform
                after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 11 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">11</Badge>
                <h2 className="text-xl font-bold text-white">Contact</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                For questions about these Terms, please contact us at:{' '}
                <a
                  href="mailto:cantondetailingpros@gmail.com"
                  className="text-violet-400 hover:underline font-medium"
                >
                  cantondetailingpros@gmail.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="gap-2 border-slate-700 text-white hover:bg-slate-800">
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
