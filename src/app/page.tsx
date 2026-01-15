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

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear error when user starts typing
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
            Request Mobile Auto Detailing in Canton, MI
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-2">
            We connect you with an available local provider.
          </p>
          <p className="text-blue-200">
            Professional detailing services that come to you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitStatus === 'success' ? (
            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
              <p className="text-gray-600 mb-6">{resultMessage}</p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="btn-primary"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get a Quote for Mobile Detailing
              </h2>

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {resultMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
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
                    className={`input-field ${errors.zip ? 'border-red-500' : ''}`}
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
                    className={`input-field ${errors.fullName ? 'border-red-500' : ''}`}
                  />
                  {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                </div>

                {/* Phone */}
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
                    className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="label-text">
                    Email <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                {/* Service Type */}
                <div>
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

                {/* Preferred Timing */}
                <div>
                  <label htmlFor="preferredTiming" className="label-text">
                    Preferred Timing <span className="text-gray-400">(optional)</span>
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

                {/* Details */}
                <div>
                  <label htmlFor="details" className="label-text">
                    Additional Details <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Vehicle type, specific concerns, etc."
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    By submitting, you agree to be contacted by phone, text, or email regarding
                    your detailing request. <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.consent && <p className="error-text">{errors.consent}</p>}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Service'}
                </button>
              </form>

              <p className="mt-6 text-xs text-gray-500 text-center">
                This site connects you with independent local mobile auto detailing providers.
                We are not the service provider.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Choose Mobile Detailing?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
              <p className="text-gray-600 text-sm">
                No need to drive anywhere. Service at your home, office, or anywhere convenient.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
              <p className="text-gray-600 text-sm">
                Continue your day while your car gets detailed. No waiting rooms.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
              <p className="text-gray-600 text-sm">
                Connected with trusted, independent detailing providers in Canton, MI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business CTA */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Are You a Mobile Detailing Business?
          </h2>
          <p className="text-gray-600 mb-6">
            Get exclusive leads for your service area. One business per ZIP code.
          </p>
          <Link href="/business" className="btn-primary inline-block">
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
