'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CheckCircle2,
  MapPin,
  Shield,
  Clock,
  Sparkles,
  Loader2,
  ArrowRight,
  Star,
  Zap,
  Phone
} from 'lucide-react';

interface FormData {
  zip: string;
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  preferredTiming: string;
  details: string;
  consent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const SERVICE_TYPES = [
  'Mobile Auto Detailing',
  'Interior Detailing',
  'Exterior Detailing',
  'Full Detail Package',
  'Paint Correction',
  'Ceramic Coating',
  'Other',
];

export default function HomePage() {
  const [formData, setFormData] = useState<FormData>({
    zip: '',
    fullName: '',
    phone: '',
    email: '',
    serviceType: 'Mobile Auto Detailing',
    preferredTiming: '',
    details: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [resultMessage, setResultMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!/^\d{5}$/.test(formData.zip)) {
      newErrors.zip = 'Please enter a valid 5-digit ZIP code';
    }

    if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to be contacted';
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
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setResultMessage(
          result.assigned
            ? 'A local provider will contact you shortly!'
            : 'We received your request and will follow up soon!'
        );
        toast.success('Request submitted successfully!');
        setFormData({
          zip: '',
          fullName: '',
          phone: '',
          email: '',
          serviceType: 'Mobile Auto Detailing',
          preferredTiming: '',
          details: '',
          consent: false,
        });
      } else {
        setSubmitStatus('error');
        setResultMessage(result.error || 'Something went wrong. Please try again.');
        toast.error(result.error || 'Something went wrong');
      }
    } catch {
      setSubmitStatus('error');
      setResultMessage('Unable to submit. Please check your connection and try again.');
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/50 to-slate-950" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/30 rounded-full filter blur-[128px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full filter blur-[128px] animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full filter blur-[128px]" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/20">
                <Sparkles className="w-3 h-3 mr-1" />
                #1 Mobile Detailing Platform in Canton
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Premium Mobile
                <span className="block text-gradient">Auto Detailing</span>
                <span className="block text-white/90">at Your Doorstep</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Get connected with verified local professionals who bring showroom-quality detailing directly to your home or office in Canton, MI.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-sm">Verified Pros</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-violet-400" />
                  </div>
                  <span className="text-sm">Fast Response</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <span className="text-sm">5-Star Service</span>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 border-2 border-slate-950 flex items-center justify-center text-white text-xs font-medium">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-400">
                  <span className="text-white font-semibold">500+</span> happy customers this month
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div id="quote-form">
              {submitStatus === 'success' ? (
                <Card className="glass-dark border-slate-700/50 shadow-2xl shadow-violet-500/10">
                  <CardContent className="pt-10 pb-10 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 glow-sm">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Request Submitted!</h2>
                    <p className="text-slate-400 mb-8">{resultMessage}</p>
                    <Button
                      onClick={() => setSubmitStatus('idle')}
                      className="w-full gradient-primary hover:opacity-90 text-white border-0"
                      size="lg"
                    >
                      Submit Another Request
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="glass-dark border-slate-700/50 shadow-2xl shadow-violet-500/10">
                  <CardContent className="pt-8 pb-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-white mb-2">Get Your Free Quote</h2>
                      <p className="text-slate-400">Connect with a local pro in minutes</p>
                    </div>

                    {submitStatus === 'error' && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-400 text-sm">{resultMessage}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="zip" className="text-slate-300">ZIP Code *</Label>
                          <Input
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            placeholder="48188"
                            maxLength={5}
                            className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20 ${errors.zip ? 'border-red-500' : ''}`}
                          />
                          {errors.zip && <p className="text-xs text-red-400">{errors.zip}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-slate-300">Phone *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(734) 555-0123"
                            className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20 ${errors.phone ? 'border-red-500' : ''}`}
                          />
                          {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-slate-300">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20 ${errors.fullName ? 'border-red-500' : ''}`}
                        />
                        {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serviceType" className="text-slate-300">Service Requested</Label>
                        <Select
                          value={formData.serviceType}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, serviceType: value }))}
                        >
                          <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white focus:border-violet-500 focus:ring-violet-500/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {SERVICE_TYPES.map((service) => (
                              <SelectItem key={service} value={service} className="text-white hover:bg-slate-700">
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="details" className="text-slate-300">Additional Details</Label>
                        <Textarea
                          id="details"
                          name="details"
                          value={formData.details}
                          onChange={handleChange}
                          placeholder="Tell us about your vehicle..."
                          rows={3}
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20"
                        />
                      </div>

                      <div className="flex items-start space-x-3 pt-2">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, consent: checked === true }))
                          }
                          className={`border-slate-600 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600 ${errors.consent ? 'border-red-500' : ''}`}
                        />
                        <Label htmlFor="consent" className="text-sm text-slate-400 leading-snug font-normal cursor-pointer">
                          I agree to be contacted by phone, text, or email by a local provider. *
                        </Label>
                      </div>
                      {errors.consent && <p className="text-xs text-red-400">{errors.consent}</p>}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full gradient-primary hover:opacity-90 text-white border-0 h-12 text-base font-semibold"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Connecting You...
                          </>
                        ) : (
                          <>
                            Get Connected Now
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-slate-500 pt-2">
                        100% Free • No Obligation • Instant Match
                      </p>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Simple Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Getting professional mobile detailing has never been easier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                title: 'Submit Request',
                description: 'Fill out the quick form with your location and service preferences.',
                icon: Phone,
              },
              {
                step: '02',
                title: 'Get Matched',
                description: 'We instantly connect you with a verified local detailing pro.',
                icon: Zap,
              },
              {
                step: '03',
                title: 'Enjoy Results',
                description: 'The provider comes to you and delivers showroom-quality results.',
                icon: Sparkles,
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="text-center p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300 hover-lift">
                  <div className="text-6xl font-bold text-gradient opacity-20 mb-4">{item.step}</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 glow-sm">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-[2px] bg-gradient-to-r from-violet-500/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Our Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Premium Detailing Services
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Connect with providers offering comprehensive auto care solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Interior Detailing',
                description: 'Deep cleaning, vacuuming, leather treatment, stain removal, and odor elimination.',
                image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071',
              },
              {
                title: 'Exterior Detailing',
                description: 'Hand wash, clay bar treatment, polish, wax, and paint protection.',
                image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2031',
              },
              {
                title: 'Full Detail Package',
                description: 'Complete interior and exterior transformation for the ultimate clean.',
                image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070',
              },
              {
                title: 'Paint Correction',
                description: 'Remove swirl marks, scratches, and imperfections for a flawless finish.',
                image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?q=80&w=2069',
              },
              {
                title: 'Ceramic Coating',
                description: 'Long-lasting protection with hydrophobic properties and UV resistance.',
                image: 'https://images.unsplash.com/photo-1600275669439-14e40452d20b?q=80&w=2074',
              },
              {
                title: 'Mobile Service',
                description: 'Professional detailing at your home, office, or any location you choose.',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2064',
              },
            ].map((service, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden hover-lift">
                <div className="relative h-64">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-300 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                The Smarter Way to Find
                <span className="text-gradient"> Quality Detailing</span>
              </h2>
              <p className="text-lg text-slate-400 mb-10">
                We&apos;ve simplified the process of finding trusted mobile detailing professionals in Canton.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: 'Hyperlocal Matching',
                    description: 'We connect you with providers who serve your specific ZIP code area.',
                  },
                  {
                    icon: Shield,
                    title: 'Verified Professionals',
                    description: 'Every provider is vetted for quality, reliability, and professionalism.',
                  },
                  {
                    icon: Clock,
                    title: 'Fast Response Times',
                    description: 'Get contacted by a local pro within minutes of submitting your request.',
                  },
                  {
                    icon: Sparkles,
                    title: 'Premium Results',
                    description: 'Expect showroom-quality detailing delivered right to your location.',
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070"
                  alt="Professional detailing"
                  width={600}
                  height={500}
                  className="object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              </div>

              {/* Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">4.9/5</div>
                    <div className="text-slate-400 text-sm">Average Rating</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full px-4 py-2 shadow-lg glow-sm">
                <span className="text-white font-semibold text-sm">100% Free Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready for a Showroom Shine?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who&apos;ve discovered the convenience of premium mobile detailing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-violet-600 hover:bg-white/90 h-14 px-8 text-base font-semibold"
            >
              <a href="#quote-form">
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-base font-semibold"
            >
              <Link href="/business">Join as a Provider</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
