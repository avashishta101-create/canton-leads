import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, ArrowLeft, CheckCircle2, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Canton Mobile Detail Pros',
  description: 'Privacy Policy for Canton Mobile Detail Pros lead connection platform.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full filter blur-[128px]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
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
                <h2 className="text-xl font-bold text-white">Introduction</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Canton Mobile Detail Pros (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is
                committed to protecting your personal information. This Privacy Policy explains how
                we collect, use, share, and protect information when you use our lead connection
                platform.
              </p>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 2 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">2</Badge>
                <h2 className="text-xl font-bold text-white">Information We Collect</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-3">From Customers (Lead Requesters)</h3>
                  <p className="text-slate-400 mb-3">When you submit a lead request, we collect:</p>
                  <ul className="space-y-2">
                    {['Full name', 'Phone number', 'Email address (if provided)', 'ZIP code', 'Service requested and details', 'Preferred timing for service'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-400">
                        <span className="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-3">From Businesses (Subscribers)</h3>
                  <p className="text-slate-400 mb-3">When you subscribe to our service, we collect:</p>
                  <ul className="space-y-2">
                    {['Business name', 'Contact name', 'Email address', 'Phone number', 'Desired ZIP code territories', 'Payment information (processed securely by Stripe)'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-400">
                        <span className="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-3">Automatically Collected Information</h3>
                  <p className="text-slate-400">
                    We may automatically collect certain information when you visit our website,
                    including IP address, browser type, device information, and pages visited. This
                    information is used for analytics and improving our service.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 3 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">3</Badge>
                <h2 className="text-xl font-bold text-white">How We Use Your Information</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-3">Customer Information</h3>
                  <p className="text-slate-400 mb-3">We use customer lead information to:</p>
                  <ul className="space-y-2">
                    {[
                      'Match you with an appropriate local service provider',
                      'Share your contact details with the matched provider',
                      'Facilitate communication between you and the provider',
                      'Improve our matching and routing services',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-400">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-3">Business Information</h3>
                  <p className="text-slate-400 mb-3">We use business subscriber information to:</p>
                  <ul className="space-y-2">
                    {[
                      'Process and manage your subscription',
                      'Deliver leads to your email',
                      'Communicate about your account and service updates',
                      'Process payments through Stripe',
                      'Manage ZIP code territory claims',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-400">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 4 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">4</Badge>
                <h2 className="text-xl font-bold text-white">Information Sharing and Disclosure</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                    <p className="text-violet-300 text-sm">
                      <span className="font-semibold">Sharing with Service Providers:</span> Customer leads are shared with matched Business subscribers. When
                      you submit a lead request, your contact information (name, phone, email, service
                      details) is shared with the Business that has claimed your ZIP code territory. This
                      sharing is the core function of our platform.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-3">Third-Party Service Providers</h3>
                  <p className="text-slate-400 mb-3">We may share information with third parties who help us operate our platform:</p>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong className="text-white">Stripe:</strong> For payment processing (Business subscribers only)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong className="text-white">Supabase:</strong> For secure data storage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong className="text-white">Email services:</strong> For sending lead notifications</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-3">Legal Requirements</h3>
                  <p className="text-slate-400">
                    We may disclose information if required by law, court order, or government request,
                    or to protect the rights, property, or safety of ourselves or others.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 5 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">5</Badge>
                <h2 className="text-xl font-bold text-white">Consent to Contact</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                By submitting a lead request, you expressly consent to be contacted by phone call,
                text message (SMS/MMS), and/or email by the matched service provider regarding your
                detailing request. Standard message and data rates may apply for text messages.
              </p>
              <p className="text-slate-400 leading-relaxed mt-3">
                You may opt out of communications by contacting the service provider directly or by
                emailing us at{' '}
                <a href="mailto:cantondetailingpros@gmail.com" className="text-violet-400 hover:underline font-medium">
                  cantondetailingpros@gmail.com
                </a>
                .
              </p>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Sections 6-11 */}
            {[
              { num: 6, title: 'Data Security', content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.' },
              { num: 7, title: 'Data Retention', content: 'We retain customer lead information as long as necessary for our business purposes and as required by law. Business subscriber information is retained for the duration of the subscription and for a reasonable period thereafter for record-keeping purposes.' },
              { num: 9, title: "Children's Privacy", content: 'Our platform is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.' },
              { num: 10, title: 'Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website with a new "Last updated" date. Continued use of the platform after changes constitutes acceptance of the updated policy.' },
            ].map((section) => (
              <div key={section.num}>
                <section className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">{section.num}</Badge>
                    <h2 className="text-xl font-bold text-white">{section.title}</h2>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{section.content}</p>
                </section>
                {section.num < 10 && <Separator className="mb-10 bg-slate-800" />}
              </div>
            ))}

            {/* Section 8 - Your Rights */}
            <Separator className="mb-10 bg-slate-800" />
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">8</Badge>
                <h2 className="text-xl font-bold text-white">Your Rights</h2>
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">Depending on your location, you may have rights to:</p>
              <ul className="space-y-3">
                {[
                  'Access the personal information we hold about you',
                  'Request correction of inaccurate information',
                  'Request deletion of your information',
                  'Opt out of certain data uses',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-400">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-400 leading-relaxed mt-4">
                To exercise these rights, contact us at{' '}
                <a href="mailto:cantondetailingpros@gmail.com" className="text-violet-400 hover:underline font-medium">
                  cantondetailingpros@gmail.com
                </a>
                .
              </p>
            </section>

            <Separator className="mb-10 bg-slate-800" />

            {/* Section 11 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="gradient-primary text-white h-8 w-8 rounded-lg flex items-center justify-center p-0 border-0">11</Badge>
                <h2 className="text-xl font-bold text-white">Contact Us</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please
                contact us at:
              </p>
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5 mt-4">
                <p className="font-semibold text-white">Canton Mobile Detail Pros</p>
                <p className="text-slate-400 mt-1">
                  Email:{' '}
                  <a href="mailto:cantondetailingpros@gmail.com" className="text-violet-400 hover:underline font-medium">
                    cantondetailingpros@gmail.com
                  </a>
                </p>
              </div>
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
