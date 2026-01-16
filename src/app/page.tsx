'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, MapPin, User, Clock, Download, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[700px] lg:min-h-[800px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070"
            alt="Car being detailed"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Request Mobile<br />
                Auto Detailing in<br />
                <span className="text-blue-400">Canton, MI</span>
              </h1>

              <p className="text-xl text-slate-300 mb-8">
                We connect you with an available local provider for professional mobile auto detailing services.
              </p>

              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-lg">Verified local professionals ready to serve you</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-lg">Quick response times from nearby providers</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-lg">Professional mobile detailing at your location</span>
                </li>
              </ul>
            </div>

            {/* Right Form */}
            <div id="quote-form">
              {submitStatus === 'success' ? (
                <Card className="shadow-2xl">
                  <CardContent className="pt-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Request Submitted!</h2>
                    <p className="text-slate-600 mb-8">{resultMessage}</p>
                    <Button
                      onClick={() => setSubmitStatus('idle')}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                      size="lg"
                    >
                      Submit Another Request
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">Get Connected Now</CardTitle>
                    <CardDescription>
                      Fill out the form below and we&apos;ll connect you with a local provider
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {submitStatus === 'error' && (
                      <Alert variant="destructive" className="mb-6">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{resultMessage}</AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code *</Label>
                        <Input
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          placeholder="48188"
                          maxLength={5}
                          className={errors.zip ? 'border-red-500' : ''}
                        />
                        {errors.zip && <p className="text-sm text-red-500">{errors.zip}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className={errors.fullName ? 'border-red-500' : ''}
                        />
                        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(734) 555-0123"
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serviceType">Service Requested</Label>
                        <Select
                          value={formData.serviceType}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, serviceType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICE_TYPES.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferredTiming">Preferred Timing</Label>
                        <Input
                          id="preferredTiming"
                          name="preferredTiming"
                          value={formData.preferredTiming}
                          onChange={handleChange}
                          placeholder="This week"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="details">Additional Details</Label>
                        <Textarea
                          id="details"
                          name="details"
                          value={formData.details}
                          onChange={handleChange}
                          placeholder="Tell us about your vehicle and specific needs..."
                          rows={3}
                        />
                      </div>

                      <div className="flex items-start space-x-3 pt-2">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, consent: checked === true }))
                          }
                          className={errors.consent ? 'border-red-500' : ''}
                        />
                        <Label htmlFor="consent" className="text-sm text-slate-600 leading-snug font-normal">
                          By submitting, you agree to be contacted by phone, text, or email by a local provider. *
                        </Label>
                      </div>
                      {errors.consent && <p className="text-sm text-red-500">{errors.consent}</p>}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 hover:bg-blue-600"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Get Connected to a Local Provider'
                        )}
                      </Button>

                      <p className="text-xs text-center text-slate-500 pt-2">
                        Free service • No obligation • Quick response
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
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Getting connected to a professional mobile detailer is simple and fast
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {[
              {
                step: '1',
                title: 'Submit Your Request',
                description: 'Fill out the simple form with your ZIP code, contact info, and service needs. Takes less than 2 minutes.',
              },
              {
                step: '2',
                title: 'We Connect You',
                description: 'We instantly match you with a local, verified mobile detailing provider in your area.',
              },
              {
                step: '3',
                title: 'Get Your Car Detailed',
                description: 'The provider contacts you directly to schedule service at your preferred location and time.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-medium text-slate-700">Verified Local Professionals Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Professional Mobile Detailing Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Connect with expert providers offering comprehensive auto detailing services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Interior Detailing */}
            <div className="relative rounded-2xl overflow-hidden group h-80">
              <Image
                src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071"
                alt="Interior Detailing"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Interior Detailing</h3>
                <p className="text-slate-200">Deep cleaning, vacuuming, leather treatment, and odor removal</p>
              </div>
            </div>

            {/* Exterior Detailing */}
            <div className="relative rounded-2xl overflow-hidden group h-80">
              <Image
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2031"
                alt="Exterior Detailing"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Exterior Detailing</h3>
                <p className="text-slate-200">Hand wash, clay bar treatment, polish, and wax protection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2064"
                  alt="Professional car detailing"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6">
                <div className="text-4xl font-bold text-blue-500">100%</div>
                <div className="text-slate-600 font-medium">Satisfaction</div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Why Choose Canton Mobile Detail Pros?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We make finding professional mobile detailing services in Canton effortless and reliable.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: 'Local & Convenient',
                    description: 'Get connected to verified mobile detailers who come directly to your home, office, or preferred location in Canton.',
                  },
                  {
                    icon: User,
                    title: 'Verified Professionals',
                    description: 'We only connect you with trusted, experienced mobile detailing providers who meet our quality standards.',
                  },
                  {
                    icon: Clock,
                    title: 'Fast Response',
                    description: 'Submit your request and get contacted quickly by a local provider ready to schedule your detailing service.',
                  },
                  {
                    icon: Download,
                    title: 'Free Connection Service',
                    description: "There's no charge to submit a request. You only pay the detailing provider directly for the service you choose.",
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready for a Professionally Detailed Vehicle?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Submit your request now and get connected with a local mobile detailing provider in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-blue-500 border-white hover:bg-blue-50"
            >
              <a href="#quote-form">Request Service Now</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-blue-600"
            >
              <Link href="/business">Are You a Detailer?</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
