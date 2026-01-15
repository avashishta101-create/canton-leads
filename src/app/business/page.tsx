'use client';

import { useState } from 'react';
import Link from 'next/link';

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

    // Validate ZIP codes
    const zips = formData.zipCodes
      .split(',')
      .map((z) => z.trim())
      .filter((z) => z.length > 0);

    if (zips.length === 0) {
      newErrors.zipCodes = 'At least one ZIP code is required';
    } else if (zips.length > 5) {
      newErrors.zipCodes = 'Maximum 5 ZIP codes allowed';
    } else {
      const invalidZips = zips.filter((z) => !/^\d{5}$/.test(z));
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
        // Redirect to Stripe Checkout
        window.location.href = result.checkoutUrl;
      } else {
        setSubmitError(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Unable to process. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Exclusive Local Leads — One Business Per ZIP
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-2">
            Get qualified customer requests delivered directly to you.
          </p>
          <p className="text-blue-200">
            No competition within your claimed ZIP codes.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">We Run the Ads</h3>
              <p className="text-gray-600">
                We advertise mobile auto detailing services to customers in Canton, MI and
                surrounding areas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">Customers Submit Requests</h3>
              <p className="text-gray-600">
                Interested customers fill out our form with their contact info, ZIP code, and
                service needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">Exclusive Routing</h3>
              <p className="text-gray-600">
                Leads are routed exclusively to the business that owns that ZIP code — no
                competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
            What You Get
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Exclusive Leads',
                desc: 'Only one business per ZIP code — leads are yours alone',
              },
              {
                title: 'Email Delivery',
                desc: 'Leads sent directly to your email as they come in',
              },
              {
                title: 'Simple Monthly Pricing',
                desc: '$399/month flat rate, no per-lead fees',
              },
              {
                title: 'Minimum Delivery Guarantee',
                desc: 'At least 10 leads/month — delivery extended if not met',
              },
              {
                title: 'Pause Anytime',
                desc: 'Cancel if quality dips — no long-term contracts',
              },
              {
                title: 'Full Contact Info',
                desc: 'Name, phone, email, service requested, and details',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card border-2 border-blue-600 text-center">
            <div className="bg-blue-600 text-white py-2 px-4 rounded-t-lg -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6">
              <p className="font-semibold">Lead Access Subscription</p>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900">$399</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="text-left space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Exclusive leads for your ZIP code(s)</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Minimum 10 leads/month</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Cancel anytime</span>
              </li>
            </ul>
            <p className="text-sm text-gray-500 mb-6">
              If minimum delivery isn&apos;t met, your subscription is extended until it is. No
              refunds.
            </p>
            <a href="#claim-form" className="btn-primary block">
              Claim Your ZIP Codes
            </a>
          </div>
        </div>
      </section>

      {/* Claim Form */}
      <section id="claim-form" className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Claim Your ZIP Codes
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Reserve your exclusive territory and start receiving leads.
            </p>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Business Name */}
              <div>
                <label htmlFor="businessName" className="label-text">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Your Detailing Company"
                  className={`input-field ${errors.businessName ? 'border-red-500' : ''}`}
                />
                {errors.businessName && <p className="error-text">{errors.businessName}</p>}
              </div>

              {/* Contact Name */}
              <div>
                <label htmlFor="contactName" className="label-text">
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className={`input-field ${errors.contactName ? 'border-red-500' : ''}`}
                />
                {errors.contactName && <p className="error-text">{errors.contactName}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="label-text">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@yourcompany.com"
                  className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
                <p className="text-xs text-gray-500 mt-1">Leads will be sent to this email.</p>
              </div>

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
                  className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>

              {/* ZIP Codes */}
              <div>
                <label htmlFor="zipCodes" className="label-text">
                  Desired ZIP Codes <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="zipCodes"
                  name="zipCodes"
                  value={formData.zipCodes}
                  onChange={handleChange}
                  placeholder="48187, 48188, 48170"
                  className={`input-field ${errors.zipCodes ? 'border-red-500' : ''}`}
                />
                {errors.zipCodes && <p className="error-text">{errors.zipCodes}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Enter 1–5 ZIP codes, separated by commas. Each ZIP is exclusive to one business.
                </p>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Processing...' : 'Continue to Payment'}
              </button>
            </form>

            <p className="mt-6 text-xs text-gray-500 text-center">
              By subscribing, you agree to our{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'What if I don\'t get 10 leads in a month?',
                a: 'If we don\'t deliver the minimum 10 leads in a calendar month, your subscription is automatically extended until the minimum is met. No refunds are issued.',
              },
              {
                q: 'Can I claim multiple ZIP codes?',
                a: 'Yes, you can claim up to 5 ZIP codes with your subscription. All claimed ZIPs are exclusive to your business.',
              },
              {
                q: 'What if someone else already has my ZIP?',
                a: 'ZIP codes are first-come, first-served. If a ZIP is already claimed, you\'ll need to choose a different one. We\'ll let you know during checkout.',
              },
              {
                q: 'How do I cancel?',
                a: 'You can cancel anytime. Your subscription will remain active through the end of your billing cycle. No refunds for partial months.',
              },
              {
                q: 'How are leads delivered?',
                a: 'Leads are delivered immediately via email to the address you provide during signup. Each email includes full contact info and service details.',
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
