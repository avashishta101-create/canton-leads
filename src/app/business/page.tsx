'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  BadgeCheck,
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
      title: 'Instant Delivery',
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
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/30 to-slate-950" />
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full filter blur-[128px] animate-pulse-slow" />
          <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full filter blur-[128px] animate-pulse-slow" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/20">
              <Target className="w-3 h-3 mr-1" />
              Limited ZIP Codes Available
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Exclusive Local Leads
              <span className="block text-gradient">One Business Per ZIP</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Get qualified customer requests delivered directly to you. No competition within your claimed ZIP codes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button asChild size="lg" className="gradient-primary hover:opacity-90 text-white border-0 h-14 px-8 text-base font-semibold">
                <a href="#claim-form">
                  Claim Your Territory
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800/50 h-14 px-8 text-base">
                <a href="#pricing">View Pricing</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-10 border-t border-slate-800">
              {[
                { value: '10+', label: 'Leads/Month Min' },
                { value: '100%', label: 'Exclusive' },
                { value: '$0', label: 'Per-Lead Fees' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-8 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <BadgeCheck className="w-6 h-6 text-violet-400" />
            <p className="text-slate-400">
              Trusted by local mobile detailing providers in <span className="text-white font-medium">Canton, MI</span> and surrounding areas
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Simple Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We handle the marketing. You focus on what you do best — detailing cars.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                icon: TrendingUp,
                title: 'We Run the Ads',
                desc: 'We advertise mobile auto detailing services to customers in Canton, MI and surrounding areas through targeted marketing.',
              },
              {
                step: '02',
                icon: FileText,
                title: 'Customers Submit Requests',
                desc: 'Interested customers fill out our form with their contact info, ZIP code, vehicle details, and service needs.',
              },
              {
                step: '03',
                icon: Send,
                title: 'You Get Exclusive Leads',
                desc: 'Leads are routed exclusively to YOU — the only business in that ZIP code. No sharing, no competition.',
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="text-center p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300 hover-lift">
                  <div className="text-6xl font-bold text-gradient opacity-20 mb-4">{item.step}</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 glow-sm">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-[2px] bg-gradient-to-r from-violet-500/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-24 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Benefits
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What You Get</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Everything you need to grow your detailing business with qualified leads.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-violet-500/30 transition-all duration-300 hover-lift"
              >
                <div className="w-12 h-12 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Simple Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">One Plan. No Surprises.</h2>
            <p className="text-lg text-slate-400">Flat monthly rate with exclusive territory access.</p>
          </div>

          <div className="max-w-md mx-auto relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl blur-lg opacity-30" />

            <Card className="relative glass-dark border-violet-500/30 shadow-2xl overflow-visible">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="gradient-primary text-white px-4 py-1 border-0">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pt-10">
                <CardTitle className="text-lg text-slate-400">Lead Access Subscription</CardTitle>
                <div className="flex items-baseline justify-center gap-2 mt-2">
                  <span className="text-5xl font-bold text-white">$399</span>
                  <span className="text-xl text-slate-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {[
                    'Exclusive leads for your ZIP code(s)',
                    'Minimum 10 leads per month guaranteed',
                    'Claim up to 5 ZIP codes',
                    'Instant email delivery',
                    'Full customer contact info',
                    'Cancel anytime — no contracts',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full gradient-primary hover:opacity-90 text-white border-0 h-12 text-base font-semibold" size="lg">
                  <a href="#claim-form">
                    Claim Your ZIP Codes
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>

                <p className="mt-4 text-sm text-slate-500 text-center">
                  If minimum delivery isn&apos;t met, your subscription extends until it is.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Claim Form */}
      <section id="claim-form" className="relative py-24 bg-slate-900/50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass-dark border-slate-700/50 shadow-2xl shadow-violet-500/10">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 glow-sm">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Claim Your ZIP Codes</CardTitle>
              <CardDescription className="text-slate-400">
                Reserve your exclusive territory and start receiving leads today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-slate-300">Business Name *</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your Detailing Company"
                    className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20 ${errors.businessName ? 'border-red-500' : ''}`}
                  />
                  {errors.businessName && <p className="text-xs text-red-400">{errors.businessName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-slate-300">Contact Name *</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20 ${errors.contactName ? 'border-red-500' : ''}`}
                  />
                  {errors.contactName && <p className="text-xs text-red-400">{errors.contactName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@yourcompany.com"
                    className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                  <p className="text-xs text-slate-500">Leads will be delivered to this email.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(734) 555-1234"
                    className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCodes" className="text-slate-300">Desired ZIP Codes *</Label>
                  <Input
                    id="zipCodes"
                    name="zipCodes"
                    value={formData.zipCodes}
                    onChange={handleChange}
                    placeholder="48187, 48188, 48170"
                    className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20 ${errors.zipCodes ? 'border-red-500' : ''}`}
                  />
                  {errors.zipCodes && <p className="text-xs text-red-400">{errors.zipCodes}</p>}
                  <p className="text-xs text-slate-500">Enter 1–5 ZIP codes, separated by commas.</p>

                  {parsedZips.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {parsedZips.map((zip, i) => (
                        <Badge
                          key={i}
                          className={`${
                            /^\d{5}$/.test(zip)
                              ? 'bg-violet-500/20 text-violet-300 border-violet-500/30'
                              : 'bg-red-500/20 text-red-300 border-red-500/30'
                          }`}
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
                  className="w-full gradient-primary hover:opacity-90 text-white border-0 h-12 text-base font-semibold"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Payment
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-6 text-sm text-slate-500 text-center">
                By subscribing, you agree to our{' '}
                <Link href="/terms" className="text-violet-400 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-violet-400 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <Separator className="my-6 bg-slate-700" />

              <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-400">Got questions? We&apos;ve got answers.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-violet-500/30 transition-colors"
              >
                <h3 className="font-semibold text-white mb-3 flex items-start gap-3">
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 flex-shrink-0">Q</Badge>
                  {item.q}
                </h3>
                <p className="text-slate-400 ml-9">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Claim your ZIP codes today and start receiving exclusive, qualified leads.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-violet-600 hover:bg-white/90 h-14 px-8 text-base font-semibold"
          >
            <a href="#claim-form">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
