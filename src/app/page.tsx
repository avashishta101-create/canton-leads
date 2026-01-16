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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="relative bg-white border-b border-gray-200/80 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-transparent to-blue-50/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Serving Canton, Michigan
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
              Professional Mobile Auto Detailing
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 font-medium mb-2">
              We come to you
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Connect with trusted local professionals for premium car detailing services at your home or office
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-2xl mx-auto">
          {submitStatus === 'success' ? (
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-900/5 p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Request Submitted</h2>
              <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">{resultMessage}</p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                type="button"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-900/5 p-6 sm:p-8 lg:p-10">
              <div className="mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Request a Quote
                  </h2>
                </div>
                <p className="text-gray-600 ml-13">
                  Fill out the form below and we'll connect you with a local provider in your area
                </p>
              </div>

              {submitStatus === 'error' && (
                <div
                  className="mb-6 rounded-xl border border-red-200/80 bg-gradient-to-br from-red-50 to-red-50/50 p-4 shadow-sm"
                  role="alert"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-red-800 leading-relaxed">{resultMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="zip" className="block text-sm font-semibold text-gray-900 mb-2">
                      ZIP Code <span className="text-red-500 font-normal">*</span>
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
                      className={`w-full px-4 py-3 bg-white border ${errors.zip ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm hover:shadow`}
                    />
                    {errors.zip && (
                      <p id="zip-error" className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1.5" role="alert">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors.zip}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name <span className="text-red-500 font-normal">*</span>
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
                      className={`w-full px-4 py-3 bg-white border ${errors.fullName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm hover:shadow`}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1.5" role="alert">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number <span className="text-red-500 font-normal">*</span>
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
                      className={`w-full px-4 py-3 bg-white border ${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm hover:shadow`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1.5" role="alert">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email <span className="text-gray-500 font-normal text-xs">(optional)</span>
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
                      className={`w-full px-4 py-3 bg-white border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm hover:shadow`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1.5" role="alert">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-900 mb-2">
                      Service Requested <span className="text-red-500 font-normal">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow appearance-none cursor-pointer"
                      >
                        {SERVICE_TYPES.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="preferredTiming" className="block text-sm font-semibold text-gray-900 mb-2">
                      Preferred Timing <span className="text-gray-500 font-normal text-xs">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="preferredTiming"
                      name="preferredTiming"
                      value={formData.preferredTiming}
                      onChange={handleChange}
                      placeholder="e.g., Weekend mornings, ASAP"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="details" className="block text-sm font-semibold text-gray-900 mb-2">
                      Additional Details <span className="text-gray-500 font-normal text-xs">(optional)</span>
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Vehicle type, specific concerns, etc."
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 pb-2">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      aria-invalid={errors.consent ? 'true' : 'false'}
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                      className="mt-0.5 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                      By submitting, you agree to be contacted by phone, text, or email regarding
                      your detailing request. <span className="text-red-500 font-semibold">*</span>
                    </label>
                  </div>
                  {errors.consent && (
                    <p id="consent-error" className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1.5" role="alert">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.consent}
                    </p>
                  )}
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
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
                      <span className="flex items-center justify-center gap-2">
                        Request Service
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  This site connects you with independent local mobile auto detailing providers.
                  We are not the service provider.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white border-t border-gray-200/80 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Mobile Detailing?
            </h2>
            <p className="text-lg text-gray-600">
              Professional service delivered to your location
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-white border border-gray-200/80 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
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
              <h3 className="text-lg font-bold text-gray-900 mb-3">We Come to You</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                No need to drive anywhere. Service at your home, office, or anywhere convenient.
              </p>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-white border border-gray-200/80 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
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
              <h3 className="text-lg font-bold text-gray-900 mb-3">Save Time</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Continue your day while your car gets detailed. No waiting rooms.
              </p>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-white border border-gray-200/80 hover:border-blue-200 hover:shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
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
              <h3 className="text-lg font-bold text-gray-900 mb-3">Local Professionals</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Connected with trusted, independent detailing providers in Canton, MI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business CTA */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-200/80 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            For Businesses
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Are You a Mobile Detailing Business?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get exclusive leads for your service area. One business per ZIP code.
          </p>
          <Link
            href="/business"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            Learn More
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
