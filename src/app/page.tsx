'use client';

import { useState } from 'react';
import Link from 'next/link';

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
      }
    } catch {
      setSubmitStatus('error');
      setResultMessage('Unable to submit. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      {/* Hero Section */}
      <section className="relative hero-gradient hero-pattern overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="float-element w-96 h-96 bg-indigo-400/30 -top-20 -left-20"></div>
          <div className="float-element w-80 h-80 bg-purple-400/20 top-40 -right-20" style={{ animationDelay: '-5s' }}></div>
          <div className="float-element w-64 h-64 bg-blue-400/20 bottom-20 left-1/3" style={{ animationDelay: '-10s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-white/90 text-sm font-medium">Serving Canton, MI &amp; Surrounding Areas</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Professional Mobile
                <span className="block bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Auto Detailing
                </span>
              </h1>

              <p className="text-xl text-indigo-100 mb-8 max-w-xl mx-auto lg:mx-0">
                We connect you with trusted local detailing professionals who come to your location.
                Get a sparkling clean car without leaving home.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a href="#quote-form" className="btn-primary">
                  Get Your Free Quote
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <Link href="/business" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-white/10 border-2 border-white/20 rounded-xl hover:bg-white/20 transition-all duration-200">
                  For Businesses
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap items-center gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/80 text-sm">Trusted Providers</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Fast Response</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Mobile Service</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div id="quote-form" className="relative">
              {submitStatus === 'success' ? (
                <div className="card text-center animate-scale-in">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Request Submitted!</h2>
                  <p className="text-gray-600 mb-8">{resultMessage}</p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="btn-primary w-full"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <div className="card">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Get Your Free Quote
                    </h2>
                    <p className="text-gray-500">Fill out the form and we&apos;ll connect you with a local provider</p>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="alert-error mb-6">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>{resultMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      {/* ZIP Code */}
                      <div>
                        <label htmlFor="zip" className="label-text">
                          ZIP Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          placeholder="48187"
                          maxLength={5}
                          className={`input-field ${errors.zip ? 'border-red-400' : ''}`}
                        />
                        {errors.zip && <p className="error-text">{errors.zip}</p>}
                      </div>

                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="label-text">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className={`input-field ${errors.fullName ? 'border-red-400' : ''}`}
                        />
                        {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="label-text">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(734) 555-1234"
                          className={`input-field ${errors.phone ? 'border-red-400' : ''}`}
                        />
                        {errors.phone && <p className="error-text">{errors.phone}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="label-text">
                          Email <span className="text-gray-400 font-normal text-xs">(optional)</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`input-field ${errors.email ? 'border-red-400' : ''}`}
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Service Type */}
                    <div>
                      <label htmlFor="serviceType" className="label-text">
                        Service Requested
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="input-field"
                      >
                        {SERVICE_TYPES.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Details */}
                    <div>
                      <label htmlFor="details" className="label-text">
                        Additional Details <span className="text-gray-400 font-normal text-xs">(optional)</span>
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        placeholder="Vehicle type, preferred timing, specific concerns..."
                        rows={3}
                        className="input-field resize-none"
                      />
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-0.5 w-5 h-5 text-indigo-600 bg-white border-2 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                        By submitting, you agree to be contacted by phone, text, or email regarding
                        your detailing request. <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {errors.consent && <p className="error-text -mt-2">{errors.consent}</p>}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner mr-3"></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Request Service
                          <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>

                  <p className="mt-6 text-xs text-gray-500 text-center">
                    This site connects you with independent local providers. We are not the service provider.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge-gradient mb-4">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              The Smart Way to Get Your Car Detailed
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Skip the hassle of finding reliable detailers. We connect you with vetted local professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'We Come to You',
                description: 'No need to drive anywhere. Get professional detailing at your home, office, or anywhere convenient.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Save Your Time',
                description: 'Continue your day while your car gets detailed. No waiting rooms, no wasted hours.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Trusted Professionals',
                description: 'We connect you with verified, independent detailing providers in Canton, MI and surrounding areas.',
              },
            ].map((feature, i) => (
              <div key={i} className="card-hover group text-center">
                <div className="feature-icon mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge-gradient mb-4">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Getting your car detailed has never been easier. Just three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                step: '1',
                title: 'Submit Your Request',
                description: 'Fill out our quick form with your location and service needs. Takes less than a minute.',
              },
              {
                step: '2',
                title: 'Get Matched',
                description: 'We instantly connect you with a trusted local detailing professional in your area.',
              },
              {
                step: '3',
                title: 'Enjoy the Results',
                description: 'Your provider comes to you and delivers a sparkling clean car at your convenience.',
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300 -z-10"></div>
                )}
                <div className="step-number mx-auto mb-6">{item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 max-w-xs mx-auto">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#quote-form" className="btn-primary">
              Get Started Now
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Business CTA */}
      <section className="py-20 sm:py-28 hero-mesh">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
            For Detailing Businesses
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Are You a Mobile Detailing Business?
          </h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Get exclusive leads for your service area. One business per ZIP code — no competition.
          </p>
          <Link href="/business" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-indigo-600 bg-white rounded-xl shadow-lg hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-200">
            Learn More &amp; Claim Your Territory
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
