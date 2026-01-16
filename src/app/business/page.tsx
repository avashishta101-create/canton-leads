'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Shield,
  Mail,
  DollarSign,
  Award,
  XCircle,
  ClipboardList,
  TrendingUp,
  FileText,
  Send,
  CheckCircle2,
  Loader2,
  Lock,
  Users,
} from 'lucide-react';

interface FormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  zipCodes: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function BusinessPage() {
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    zipCodes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Parse and display ZIP codes as user types
  const parsedZips = useMemo(() => {
    return formData.zipCodes
      .split(',')
      .map((z) => z.trim())
      .filter((z) => z.length > 0);
  }, [formData.zipCodes]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.businessName.trim().length < 2) {
      newErrors.businessName = 'Business name must be at least 2 characters';
    }

    if (formData.contactName.trim().length < 2) {
      newErrors.contactName = 'Contact name must be at least 2 characters';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    if (parsedZips.length === 0) {
      newErrors.zipCodes = 'At least one ZIP code is required';
    } else if (parsedZips.length > 5) {
      newErrors.zipCodes = 'Maximum 5 ZIP codes allowed';
    } else {
      const invalidZips = parsedZips.filter((z) => !/^\d{5}$/.test(z));
      if (invalidZips.length > 0) {
        newErrors.zipCodes = `Invalid ZIP codes: ${invalidZips.join(', ')}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/business/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success && result.checkoutUrl) {
        toast.success('Redirecting to checkout...');
        window.location.href = result.checkoutUrl;
      } else {
        setSubmitError(result.error || 'Something went wrong. Please try again.');
        toast.error(result.error || 'Something went wrong');
      }
    } catch {
      setSubmitError('Unable to process. Please check your connection and try again.');
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const benefits = [
    {
      icon: Shield,
      title: 'Exclusive Territory',
      desc: 'Only one business per ZIP code — leads are 100% yours',
    },
    {
      icon: Mail,
      title: 'Instant Email Delivery',
      desc: 'Get leads delivered directly to your inbox in real-time',
    },
    {
      icon: DollarSign,
      title: 'Simple Flat Rate',
      desc: '$399/month — no per-lead fees, no hidden costs',
    },
    {
      icon: Award,
      title: 'Minimum Guarantee',
      desc: 'At least 10 leads/month or your subscription extends',
    },
    {
      icon: XCircle,
      title: 'Cancel Anytime',
      desc: 'No long-term contracts — pause or cancel when you need',
    },
    {
      icon: ClipboardList,
      title: 'Full Lead Details',
      desc: 'Name, phone, email, service type, and special requests',
    },
  ];

  const faqs = [
    {
      q: "What if I don't get 10 leads in a month?",
      a: "If we don't deliver the minimum 10 leads in a calendar month, your subscription is automatically extended until the minimum is met. No refunds are issued — delivery extension is the remedy.",
    },
    {
      q: 'Can I claim multiple ZIP codes?',
      a: 'Yes, you can claim up to 5 ZIP codes with your subscription. All claimed ZIPs are exclusive to your business as long as your subscription is active.',
    },
    {
      q: 'What if someone else already has my ZIP?',
      a: "ZIP codes are first-come, first-served. If a ZIP is already claimed, you'll need to choose a different one. We'll let you know during checkout if any of your requested ZIPs are unavailable.",
    },
    {
      q: 'How do I cancel?',
      a: 'You can cancel anytime through Stripe or by contacting us. Your subscription will remain active through the end of your billing cycle. No refunds for partial months.',
    },
    {
      q: 'How quickly will I receive leads?',
      a: 'Leads are delivered instantly via email as soon as a customer in your ZIP code submits a request. Quick response times lead to higher conversion rates!',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
              Limited ZIP Codes Available
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Exclusive Local Leads
              <span className="block text-blue-400">One Business Per ZIP</span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Get qualified customer requests delivered directly to you. No competition within your claimed ZIP codes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
                <a href="#claim-form">
                  Claim Your Territory
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                <a href="#pricing">View Pricing</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-slate-700">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white">10+</div>
                <div className="text-sm text-slate-400 mt-1">Leads/Month Min</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white">100%</div>
                <div className="text-sm text-slate-400 mt-1">Exclusive</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white">$0</div>
                <div className="text-sm text-slate-400 mt-1">Per-Lead Fees</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Users className="w-6 h-6 text-blue-500" />
            <p className="text-slate-600 font-medium">
              Trusted by local mobile detailing providers in Canton, MI and surrounding areas
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-500 font-semibold text-sm uppercase tracking-wider mb-2">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We handle the marketing. You focus on what you do best — detailing cars.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: 1,
                icon: TrendingUp,
                title: 'We Run the Ads',
                desc: 'We advertise mobile auto detailing services to customers in Canton, MI and surrounding areas through targeted marketing.',
              },
              {
                step: 2,
                icon: FileText,
                title: 'Customers Submit Requests',
                desc: 'Interested customers fill out our form with their contact info, ZIP code, vehicle details, and service needs.',
              },
              {
                step: 3,
                icon: Send,
                title: 'You Get Exclusive Leads',
                desc: 'Leads are routed exclusively to YOU — the only business in that ZIP code. No sharing, no competition.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-white text-blue-500 rounded-full flex items-center justify-center text-sm font-bold shadow-md border-2 border-blue-500">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-500 font-semibold text-sm uppercase tracking-wider mb-2">Benefits</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">What You Get</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to grow your detailing business with qualified leads.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-500 font-semibold text-sm uppercase tracking-wider mb-2">Simple Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">One Plan. No Surprises.</h2>
            <p className="text-lg text-slate-600">Flat monthly rate with exclusive territory access.</p>
          </div>

          <Card className="max-w-md mx-auto shadow-2xl border-2 border-blue-500 relative overflow-visible">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-blue-500 text-white px-4 py-1">Most Popular</Badge>
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-lg text-slate-600">Lead Access Subscription</CardTitle>
              <div className="flex items-baseline justify-center gap-2 mt-2">
                <span className="text-5xl font-bold text-slate-900">$399</span>
                <span className="text-xl text-slate-500">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {[
                  'Exclusive leads for your ZIP code(s)',
                  'Minimum 10 leads per month guaranteed',
                  'Claim up to 5 ZIP codes',
                  'Instant email delivery',
                  'Full customer contact info',
                  'Cancel anytime — no contracts',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full bg-blue-500 hover:bg-blue-600" size="lg">
                <a href="#claim-form">Claim Your ZIP Codes</a>
              </Button>

              <p className="mt-4 text-sm text-slate-500 text-center">
                If minimum delivery isn&apos;t met, your subscription extends until it is.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Claim Form */}
      <section id="claim-form" className="py-20 bg-slate-900">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7" />
              </div>
              <CardTitle className="text-2xl">Claim Your ZIP Codes</CardTitle>
              <CardDescription>
                Reserve your exclusive territory and start receiving leads today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your Detailing Company"
                    className={errors.businessName ? 'border-red-500' : ''}
                  />
                  {errors.businessName && <p className="text-sm text-red-500">{errors.businessName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className={errors.contactName ? 'border-red-500' : ''}
                  />
                  {errors.contactName && <p className="text-sm text-red-500">{errors.contactName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@yourcompany.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  <p className="text-xs text-slate-500">Leads will be delivered to this email.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(734) 555-1234"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCodes">Desired ZIP Codes *</Label>
                  <Input
                    id="zipCodes"
                    name="zipCodes"
                    value={formData.zipCodes}
                    onChange={handleChange}
                    placeholder="48187, 48188, 48170"
                    className={errors.zipCodes ? 'border-red-500' : ''}
                  />
                  {errors.zipCodes && <p className="text-sm text-red-500">{errors.zipCodes}</p>}
                  <p className="text-xs text-slate-500">Enter 1–5 ZIP codes, separated by commas.</p>

                  {/* ZIP Preview */}
                  {parsedZips.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {parsedZips.map((zip, i) => (
                        <Badge
                          key={i}
                          variant={/^\d{5}$/.test(zip) ? 'default' : 'destructive'}
                          className={/^\d{5}$/.test(zip) ? 'bg-blue-100 text-blue-700' : ''}
                        >
                          {zip}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Continue to Payment'
                  )}
                </Button>
              </form>

              <p className="mt-6 text-sm text-slate-500 text-center">
                By subscribing, you agree to our{' '}
                <Link href="/terms" className="text-blue-500 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <Separator className="my-6" />

              <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-500 font-semibold text-sm uppercase tracking-wider mb-2">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Got questions? We&apos;ve got answers.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-3">
                    <Badge className="bg-blue-100 text-blue-700 flex-shrink-0">Q</Badge>
                    {item.q}
                  </h3>
                  <p className="text-slate-600 ml-9">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Claim your ZIP codes today and start receiving exclusive, qualified leads.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white text-blue-500 border-white hover:bg-blue-50"
          >
            <a href="#claim-form">Get Started Now</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
