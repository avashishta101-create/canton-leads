import Stripe from 'stripe';

// Initialize Stripe with secret key
// Only use on server-side
export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable');
  }

  return new Stripe(secretKey, {
    apiVersion: '2023-10-16',
    typescript: true,
  });
}

// Get the price ID for subscriptions
export function getPriceId(): string {
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!priceId) {
    throw new Error('Missing STRIPE_PRICE_ID environment variable');
  }

  return priceId;
}

// Get the webhook secret for signature verification
export function getWebhookSecret(): string {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable');
  }

  return webhookSecret;
}

// Verify webhook signature and construct event
export async function constructWebhookEvent(
  body: string | Buffer,
  signature: string
): Promise<Stripe.Event> {
  const stripe = getStripe();
  const webhookSecret = getWebhookSecret();

  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`Webhook signature verification failed: ${message}`);
  }
}
