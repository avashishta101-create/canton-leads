// Database types for Canton Mobile Detail Pros

export interface Business {
  id: string;
  name: string;
  contact_name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  business_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  status: 'active' | 'past_due' | 'canceled';
  current_period_end: string | null;
  created_at: string;
}

export interface ZipClaim {
  id: string;
  zip: string;
  business_id: string;
  status: 'pending' | 'active' | 'canceled';
  created_at: string;
}

export interface Lead {
  id: string;
  zip: string;
  full_name: string;
  phone: string;
  email: string | null;
  service_type: string;
  preferred_timing: string | null;
  details: string | null;
  assigned_business_id: string | null;
  created_at: string;
}

// API Request/Response types

export interface LeadSubmission {
  zip: string;
  fullName: string;
  phone: string;
  email?: string;
  serviceType: string;
  preferredTiming?: string;
  details?: string;
  consent: boolean;
}

export interface BusinessClaimRequest {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  zipCodes: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Extended types for admin views

export interface LeadWithBusiness extends Lead {
  business?: Business | null;
}

export interface BusinessWithSubscription extends Business {
  subscription?: Subscription | null;
  zip_claims?: ZipClaim[];
}
