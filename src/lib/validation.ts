import { z } from 'zod';

// ZIP code validation - exactly 5 digits
export const zipCodeSchema = z.string().regex(/^\d{5}$/, 'ZIP code must be exactly 5 digits');

// Phone validation - flexible format, at least 10 digits
export const phoneSchema = z.string().min(10, 'Phone number must be at least 10 digits');

// Email validation
export const emailSchema = z.string().email('Invalid email address');

// Lead submission schema
export const leadSubmissionSchema = z.object({
  zip: zipCodeSchema,
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: phoneSchema,
  email: z.string().email().optional().or(z.literal('')),
  serviceType: z.string().min(1, 'Service type is required'),
  preferredTiming: z.string().optional(),
  details: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to be contacted' }),
  }),
});

// Business claim request schema
export const businessClaimSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters'),
  email: emailSchema,
  phone: phoneSchema,
  zipCodes: z.string().min(5, 'At least one ZIP code is required'),
});

// Parse and validate ZIP codes from comma-separated string
export function parseZipCodes(zipCodesStr: string): { valid: string[]; invalid: string[] } {
  const zips = zipCodesStr
    .split(',')
    .map((z) => z.trim())
    .filter((z) => z.length > 0);

  const valid: string[] = [];
  const invalid: string[] = [];

  for (const zip of zips) {
    if (/^\d{5}$/.test(zip)) {
      if (!valid.includes(zip)) {
        valid.push(zip);
      }
    } else {
      invalid.push(zip);
    }
  }

  return { valid, invalid };
}

// Validate ZIP code count (1-5 allowed)
export function validateZipCount(zips: string[]): string | null {
  if (zips.length === 0) {
    return 'At least one ZIP code is required';
  }
  if (zips.length > 5) {
    return 'Maximum 5 ZIP codes allowed';
  }
  return null;
}

// Clean phone number to just digits
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

// Format validation errors for API response
export function formatZodErrors(error: z.ZodError): string {
  return error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
}
