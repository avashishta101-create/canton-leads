# Canton Mobile Detail Pros

A production-ready lead-routing website for mobile auto detailing services in Canton, MI. This platform connects customers with independent local detailing providers through an exclusive ZIP code-based subscription model.

## Features

- **Customer Lead Form** - Customers can request mobile auto detailing services
- **Business Subscription** - Detailers can subscribe to receive exclusive leads for claimed ZIP codes
- **ZIP Code Exclusivity** - Only one business can claim a ZIP code at a time
- **Stripe Integration** - Secure subscription payments via Stripe Checkout
- **Email Notifications** - Lead details sent via Gmail SMTP to assigned businesses
- **Admin Dashboard** - Manage leads and manually assign unassigned leads

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe Subscriptions
- **Email**: Nodemailer with Gmail SMTP
- **Deployment**: Vercel

## Project Structure

```
canton-mobile-detail-pros/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Customer lead form
│   │   ├── business/
│   │   │   ├── page.tsx             # Business subscription page
│   │   │   ├── success/page.tsx     # Post-checkout success
│   │   │   └── canceled/page.tsx    # Checkout canceled
│   │   ├── admin/leads/page.tsx     # Admin dashboard
│   │   ├── terms/page.tsx           # Terms of Service
│   │   ├── privacy/page.tsx         # Privacy Policy
│   │   └── api/
│   │       ├── leads/route.ts       # POST leads
│   │       ├── business/claim/route.ts
│   │       ├── stripe/
│   │       │   ├── checkout/route.ts
│   │       │   └── webhook/route.ts
│   │       └── admin/
│   │           ├── leads/route.ts
│   │           └── assign/route.ts
│   ├── components/
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── supabase.ts              # Supabase clients
│   │   ├── stripe.ts                # Stripe utilities
│   │   ├── email.ts                 # Email sending
│   │   └── validation.ts            # Input validation
│   └── types/
│       └── index.ts                 # TypeScript types
├── supabase/
│   └── schema.sql                   # Database schema
├── .env.local.example               # Environment variables template
└── README.md
```

## Local Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (test mode)
- Gmail account with App Password

### 1. Clone and Install

```bash
git clone <repository-url>
cd canton-mobile-detail-pros
npm install
```

### 2. Set Up Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:

```env
# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe (Test Mode)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_1SptJ94J8eKGx9vv6e4MjsC6

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Admin
ADMIN_TOKEN=admin_F9w2Kc7mP4vQ8xN3tL6sR1

# Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM=your-email@gmail.com
```

### 3. Set Up Supabase

1. Create a new Supabase project at https://supabase.com
2. Go to **SQL Editor** in your Supabase dashboard
3. Copy the contents of `supabase/schema.sql`
4. Paste and run the SQL to create all tables and indexes
5. Copy your project URL and API keys from **Settings > API**

### 4. Set Up Stripe (Test Mode)

1. Create a Stripe account at https://stripe.com
2. **Enable Test Mode** (toggle in dashboard)
3. Create a product:
   - Go to **Products > Add Product**
   - Name: "Canton Mobile Detail Pros - Lead Access"
   - Price: $399.00 / month (recurring)
   - Copy the **Price ID** (starts with `price_`)
4. Get API keys from **Developers > API Keys**:
   - Copy Publishable key (`pk_test_...`)
   - Copy Secret key (`sk_test_...`)

### 5. Set Up Gmail SMTP

1. Go to your Gmail account settings
2. Enable **2-Step Verification** at https://myaccount.google.com/security
3. Create an **App Password** at https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (custom name)"
   - Name it "Canton Detail Leads"
   - Copy the 16-character password

### 6. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 to view the site.

## Stripe Webhook Setup (Required for Subscriptions)

### Local Development (Stripe CLI)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

4. Copy the webhook signing secret (`whsec_...`) to your `.env.local`

### Production (Vercel)

1. In Stripe Dashboard, go to **Developers > Webhooks**
2. Click **Add endpoint**
3. Enter URL: `https://your-domain.vercel.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the signing secret (`whsec_...`) to your Vercel environment variables

## Vercel Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Framework Preset: Next.js (auto-detected)

### 3. Configure Environment Variables

In Vercel project settings (**Settings > Environment Variables**), add all variables from `.env.local`:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` (or `pk_live_...` for production) |
| `STRIPE_SECRET_KEY` | `sk_test_...` (or `sk_live_...` for production) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (from webhook endpoint) |
| `STRIPE_PRICE_ID` | `price_1SptJ94J8eKGx9vv6e4MjsC6` |
| `SUPABASE_URL` | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` |
| `ADMIN_TOKEN` | `admin_F9w2Kc7mP4vQ8xN3tL6sR1` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `your-email@gmail.com` |
| `SMTP_PASS` | `your-app-password` |
| `SMTP_FROM` | `your-email@gmail.com` |

### 4. Deploy

Click **Deploy** and wait for the build to complete.

### 5. Set Up Production Webhook

After deployment, create the Stripe webhook endpoint pointing to your Vercel URL (see Stripe Webhook Setup above).

## Admin Access

Access the admin dashboard at:

```
https://your-domain.vercel.app/admin/leads?token=admin_F9w2Kc7mP4vQ8xN3tL6sR1
```

Features:
- View all leads (assigned and unassigned)
- Filter by status
- Manually assign leads to businesses
- View registered businesses

## Testing

### Test 1: Lead Saved Successfully

1. Go to the homepage (/)
2. Fill out the lead form:
   - ZIP: 48187
   - Name: Test Customer
   - Phone: 7345551234
   - Check consent box
3. Submit the form
4. Verify in Supabase: `SELECT * FROM leads ORDER BY created_at DESC LIMIT 1`

### Test 2: ZIP Exclusivity Enforced

1. Go to /business
2. Fill out the form with ZIP code 48187
3. Complete Stripe checkout (use test card 4242 4242 4242 4242)
4. Try to claim the same ZIP with a different email
5. Verify you receive an error: "ZIP code already claimed"

### Test 3: Subscription Activates Routing

1. Create a business subscription for ZIP 48188
2. Verify in Supabase: `SELECT * FROM zip_claims WHERE zip = '48188'` (status should be 'active')
3. Submit a lead for ZIP 48188
4. Verify the lead is assigned: `SELECT * FROM leads WHERE zip = '48188'`
5. Check that email notification was sent

### Stripe Test Cards

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 3220 | 3D Secure required |

Use any future expiration date and any 3-digit CVC.

## Adding Google Ads Conversion Tracking

To track conversions from Google Ads:

1. Get your Google Ads conversion tracking code
2. Add to `src/app/layout.tsx`:

```tsx
import Script from 'next/script';

// In the return statement, add to <head>:
<Script
  src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-ads" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-XXXXXXXXX');
  `}
</Script>
```

3. Fire conversion on lead submission by adding to the success handler in `src/app/page.tsx`:

```tsx
// After successful lead submission
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXX/YYYYYYYYY',
    'value': 1.0,
    'currency': 'USD'
  });
}
```

## Switching to Production (Live Mode)

When ready to accept real payments:

1. In Stripe Dashboard, switch to **Live Mode**
2. Create the same product/price in Live Mode
3. Update Vercel environment variables:
   - `STRIPE_PUBLISHABLE_KEY` → `pk_live_...`
   - `STRIPE_SECRET_KEY` → `sk_live_...`
   - `STRIPE_PRICE_ID` → new live price ID
4. Create a new webhook endpoint for live mode
5. Update `STRIPE_WEBHOOK_SECRET` with the live webhook secret
6. Redeploy on Vercel

## Security Notes

- **SUPABASE_SERVICE_ROLE_KEY** is never exposed to the client
- All database writes use server-side API routes
- Stripe webhook signatures are verified using the raw request body
- Admin panel is protected by token authentication
- Sensitive environment variables are not logged

## Support

For questions or issues, contact: cantondetailingpros@gmail.com
