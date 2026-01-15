-- Canton Mobile Detail Pros Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension (usually enabled by default)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- BUSINESSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_businesses_email ON businesses(email);

-- ============================================
-- SUBSCRIPTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('active', 'past_due', 'canceled')) DEFAULT 'active',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for business lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_business_id ON subscriptions(business_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);

-- ============================================
-- ZIP_CLAIMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS zip_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zip TEXT NOT NULL CHECK (zip ~ '^\d{5}$'),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'canceled')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CRITICAL: Unique constraint for ZIP exclusivity
-- Only one business can have a pending or active claim on a ZIP
CREATE UNIQUE INDEX IF NOT EXISTS idx_zip_claims_exclusive
ON zip_claims(zip)
WHERE status IN ('pending', 'active');

-- Index for business lookups
CREATE INDEX IF NOT EXISTS idx_zip_claims_business_id ON zip_claims(business_id);
CREATE INDEX IF NOT EXISTS idx_zip_claims_zip ON zip_claims(zip);

-- ============================================
-- LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zip TEXT NOT NULL CHECK (zip ~ '^\d{5}$'),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_type TEXT NOT NULL DEFAULT 'Mobile Auto Detailing',
  preferred_timing TEXT,
  details TEXT,
  assigned_business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for ZIP lookups and assignment queries
CREATE INDEX IF NOT EXISTS idx_leads_zip ON leads(zip);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_business_id ON leads(assigned_business_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- ============================================
-- HELPER FUNCTION: Find eligible business for a ZIP
-- ============================================
CREATE OR REPLACE FUNCTION find_eligible_business_for_zip(lead_zip TEXT)
RETURNS UUID AS $$
DECLARE
  eligible_business_id UUID;
BEGIN
  SELECT zc.business_id INTO eligible_business_id
  FROM zip_claims zc
  INNER JOIN subscriptions s ON s.business_id = zc.business_id
  WHERE zc.zip = lead_zip
    AND zc.status = 'active'
    AND s.status = 'active'
    AND s.current_period_end > NOW()
  LIMIT 1;

  RETURN eligible_business_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- RLS POLICIES (Disabled for MVP - all access via service role)
-- ============================================
-- For MVP, we're keeping RLS off and using service role key in server routes only.
-- Uncomment and customize these policies for production if needed:

-- ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE zip_claims ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- ============================================
-- NOTES
-- ============================================
-- 1. All database writes happen via server routes using SUPABASE_SERVICE_ROLE_KEY
-- 2. The service role key is NEVER exposed to the client
-- 3. ZIP exclusivity is enforced via the unique partial index on zip_claims
-- 4. Race conditions for ZIP claims are handled by catching unique constraint violations
