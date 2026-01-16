import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Shield, ArrowLeft, CheckCircle2, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Canton Mobile Detail Pros',
  description: 'Privacy Policy for Canton Mobile Detail Pros lead connection platform.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
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
                <h2 className="text-xl font-bold text-slate-900">Introduction</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Canton Mobile Detail Pros (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is
                committed to protecting your personal information. This Privacy Policy explains how
                we collect, use, share, and protect information when you use our lead connection
                platform.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 2 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">2</Badge>
                <h2 className="text-xl font-bold text-slate-900">Information We Collect</h2>
              </div>

              <div className="space-y-4">
                <Card className="bg-slate-50 border-0">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">From Customers (Lead Requesters)</h3>
                    <p className="text-slate-600 mb-3">When you submit a lead request, we collect:</p>
                    <ul className="space-y-2">
                      {['Full name', 'Phone number', 'Email address (if provided)', 'ZIP code', 'Service requested and details', 'Preferred timing for service'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-600">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50 border-0">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">From Businesses (Subscribers)</h3>
                    <p className="text-slate-600 mb-3">When you subscribe to our service, we collect:</p>
                    <ul className="space-y-2">
                      {['Business name', 'Contact name', 'Email address', 'Phone number', 'Desired ZIP code territories', 'Payment information (processed securely by Stripe)'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-600">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50 border-0">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Automatically Collected Information</h3>
                    <p className="text-slate-600">
                      We may automatically collect certain information when you visit our website,
                      including IP address, browser type, device information, and pages visited. This
                      information is used for analytics and improving our service.
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
                <h2 className="text-xl font-bold text-slate-900">How We Use Your Information</h2>
              </div>

              <div className="space-y-4">
                <Card className="bg-slate-50 border-0">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Customer Information</h3>
                    <p className="text-slate-600 mb-3">We use customer lead information to:</p>
                    <ul className="space-y-2">
                      {[
                        'Match you with an appropriate local service provider',
                        'Share your contact details with the matched provider',
                        'Facilitate communication between you and the provider',
                        'Improve our matching and routing services',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50 border-0">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Business Information</h3>
                    <p className="text-slate-600 mb-3">We use business subscriber information to:</p>
                    <ul className="space-y-2">
                      {[
                        'Process and manage your subscription',
                        'Deliver leads to your email',
                        'Communicate about your account and service updates',
                        'Process payments through Stripe',
                        'Manage ZIP code territory claims',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="mb-10" />

            {/* Section 4 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">4</Badge>
                <h2 className="text-xl font-bold text-slate-900">Information Sharing and Disclosure</h2>
              </div>

              <div className="space-y-4">
                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="w-5 h-5 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Sharing with Service Providers:</strong> Customer leads are shared with matched Business subscribers. When
                    you submit a lead request, your contact information (name, phone, email, service
                    details) is shared with the Business that has claimed your ZIP code territory. This
                    sharing is the core function of our platform.
                  </AlertDescription>
                </Alert>

                <Card className="bg-slate-50 border-0">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Third-Party Service Providers</h3>
                    <p className="text-slate-600 mb-3">We may share information with third parties who help us operate our platform:</p>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Stripe:</strong> For payment processing (Business subscribers only)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Supabase:</strong> For secure data storage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Email services:</strong> For sending lead notifications</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50 border-0">
                  <CardContent className="pt-5 pb-5">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Legal Requirements</h3>
                    <p className="text-slate-600">
                      We may disclose information if required by law, court order, or government request,
                      or to protect the rights, property, or safety of ourselves or others.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="mb-10" />

            {/* Section 5 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">5</Badge>
                <h2 className="text-xl font-bold text-slate-900">Consent to Contact</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                By submitting a lead request, you expressly consent to be contacted by phone call,
                text message (SMS/MMS), and/or email by the matched service provider regarding your
                detailing request. Standard message and data rates may apply for text messages.
              </p>
              <p className="text-slate-600 leading-relaxed mt-3">
                You may opt out of communications by contacting the service provider directly or by
                emailing us at{' '}
                <a
                  href="mailto:cantondetailingpros@gmail.com"
                  className="text-blue-500 hover:underline font-medium"
                >
                  cantondetailingpros@gmail.com
                </a>
                .
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 6 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">6</Badge>
                <h2 className="text-xl font-bold text-slate-900">Data Security</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your
                personal information against unauthorized access, alteration, disclosure, or
                destruction. However, no method of transmission over the Internet or electronic
                storage is 100% secure.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 7 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">7</Badge>
                <h2 className="text-xl font-bold text-slate-900">Data Retention</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We retain customer lead information as long as necessary for our business purposes
                and as required by law. Business subscriber information is retained for the duration
                of the subscription and for a reasonable period thereafter for record-keeping
                purposes.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 8 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">8</Badge>
                <h2 className="text-xl font-bold text-slate-900">Your Rights</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">Depending on your location, you may have rights to:</p>
              <ul className="space-y-3">
                {[
                  'Access the personal information we hold about you',
                  'Request correction of inaccurate information',
                  'Request deletion of your information',
                  'Opt out of certain data uses',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                To exercise these rights, contact us at{' '}
                <a
                  href="mailto:cantondetailingpros@gmail.com"
                  className="text-blue-500 hover:underline font-medium"
                >
                  cantondetailingpros@gmail.com
                </a>
                .
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 9 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">9</Badge>
                <h2 className="text-xl font-bold text-slate-900">Children&apos;s Privacy</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Our platform is not intended for children under 18 years of age. We do not knowingly
                collect personal information from children. If you believe we have collected
                information from a child, please contact us immediately.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 10 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">10</Badge>
                <h2 className="text-xl font-bold text-slate-900">Changes to This Policy</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of material
                changes by posting the updated policy on our website with a new &quot;Last updated&quot; date.
                Continued use of the platform after changes constitutes acceptance of the updated
                policy.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 11 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white h-8 w-8 rounded-lg flex items-center justify-center p-0">11</Badge>
                <h2 className="text-xl font-bold text-slate-900">Contact Us</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please
                contact us at:
              </p>
              <Card className="bg-slate-50 border-0 mt-4">
                <CardContent className="pt-5 pb-5">
                  <p className="font-semibold text-slate-900">Canton Mobile Detail Pros</p>
                  <p className="text-slate-600 mt-1">
                    Email:{' '}
                    <a
                      href="mailto:cantondetailingpros@gmail.com"
                      className="text-blue-500 hover:underline font-medium"
                    >
                      cantondetailingpros@gmail.com
                    </a>
                  </p>
                </CardContent>
              </Card>
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
