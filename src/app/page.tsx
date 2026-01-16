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
      newErrors.zip = 'ZIP code must be exactly 5 digits';
    }

    if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must consent to be contacted';
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
            ? 'Thanks — a local provider will contact you shortly.'
            : 'Thanks — we received your request and will follow up soon.'
        );
        // Reset form
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

    setFormData((prev: FormData) => ({ ...prev, [name]: newValue }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: FormErrors) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight mb-3">
              Mobile Auto Detailing in Canton, MI
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Connect with local professionals who come to you
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {submitStatus === 'success' ? (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 sm:p-10 text-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Request Submitted</h2>
              <p className="text-gray-600 mb-8">{resultMessage}</p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="btn-primary"
                type="button"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Request a Quote
                </h2>
                <p className="text-gray-600 text-sm">
                  Fill out the form below and we'll connect you with a local provider
                </p>
              </div>

              {submitStatus === 'error' && (
                <div
                  className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4"
                  role="alert"
                >
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm text-red-800">{resultMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
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
                      aria-invalid={errors.zip ? 'true' : 'false'}
                      aria-describedby={errors.zip ? 'zip-error' : undefined}
                      className={`input-field ${errors.zip ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    />
                    {errors.zip && (
                      <p id="zip-error" className="error-text" role="alert">
                        {errors.zip}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
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
                      aria-invalid={errors.fullName ? 'true' : 'false'}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      className={`input-field ${errors.fullName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="error-text" role="alert">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="label-text">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(734) 555-1234"
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="error-text" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="label-text">
                      Email <span className="text-gray-500 font-normal">(optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p id="email-error" className="error-text" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="serviceType" className="label-text">
                      Service Requested <span className="text-red-500">*</span>
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

                  <div className="sm:col-span-2">
                    <label htmlFor="preferredTiming" className="label-text">
                      Preferred Timing <span className="text-gray-500 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="preferredTiming"
                      name="preferredTiming"
                      value={formData.preferredTiming}
                      onChange={handleChange}
                      placeholder="e.g., Weekend mornings, ASAP"
                      className="input-field"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="details" className="label-text">
                      Additional Details <span className="text-gray-500 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Vehicle type, specific concerns, etc."
                      rows={4}
                      className="input-field resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      aria-invalid={errors.consent ? 'true' : 'false'}
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                      className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed">
                      By submitting, you agree to be contacted by phone, text, or email regarding
                      your detailing request. <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {errors.consent && (
                    <p id="consent-error" className="error-text mt-2" role="alert">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Request Service'
                    )}
                  </button>
                </div>
              </form>

              <p className="mt-8 text-xs text-gray-500 text-center leading-relaxed">
                This site connects you with independent local mobile auto detailing providers.
                We are not the service provider.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white border-t border-gray-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
              Why Choose Mobile Detailing?
            </h2>
            <p className="text-gray-600">
              Professional service delivered to your location
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">We Come to You</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                No need to drive anywhere. Service at your home, office, or anywhere convenient.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Save Time</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Continue your day while your car gets detailed. No waiting rooms.
              </p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Local Professionals</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Connected with trusted, independent detailing providers in Canton, MI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business CTA */}
      <section className="bg-gray-50 border-t border-gray-200 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
            Are You a Mobile Detailing Business?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get exclusive leads for your service area. One business per ZIP code.
          </p>
          <Link
            href="/business"
            className="btn-primary inline-block"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
