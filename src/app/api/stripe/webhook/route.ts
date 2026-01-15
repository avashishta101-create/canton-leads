import { NextRequest, NextResponse } from 'next/server';
import { getStripe, constructWebhookEvent } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

// Disable body parsing - we need the raw body for webhook verification
export const dynamic = 'force-dynamic';

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = getSupabaseAdmin();
  const businessId = session.metadata?.business_id;
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  if (!businessId) {
    console.error('No business_id in checkout session metadata');
    return;
  }

  console.log(`Checkout completed for business ${businessId}`);

  // The subscription will be handled by subscription.created event
  // Just log for now
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const supabase = getSupabaseAdmin();
  const businessId = subscription.metadata?.business_id;
  const customerId = subscription.customer as string;

  if (!businessId) {
    console.error('No business_id in subscription metadata');
    return;
  }

  console.log(`Subscription created for business ${businessId}`);

  // Create subscription record
  const { error: subError } = await supabase.from('subscriptions').upsert(
    {
      business_id: businessId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      status: subscription.status === 'active' ? 'active' : 'past_due',
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    },
    {
      onConflict: 'stripe_subscription_id',
    }
  );

  if (subError) {
    console.error('Failed to create subscription record:', subError);
    return;
  }

  // Activate pending ZIP claims for this business
  if (subscription.status === 'active') {
    const { error: claimError } = await supabase
      .from('zip_claims')
      .update({ status: 'active' })
      .eq('business_id', businessId)
      .eq('status', 'pending');

    if (claimError) {
      console.error('Failed to activate ZIP claims:', claimError);
    } else {
      console.log(`Activated ZIP claims for business ${businessId}`);
    }
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const supabase = getSupabaseAdmin();
  const businessId = subscription.metadata?.business_id;

  if (!businessId) {
    // Try to find business by subscription ID
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('business_id')
      .eq('stripe_subscription_id', subscription.id)
      .single();

    if (!existingSub) {
      console.error('Cannot find business for subscription:', subscription.id);
      return;
    }
  }

  const targetBusinessId =
    businessId ||
    (
      await supabase
        .from('subscriptions')
        .select('business_id')
        .eq('stripe_subscription_id', subscription.id)
        .single()
    ).data?.business_id;

  if (!targetBusinessId) {
    console.error('No business found for subscription update');
    return;
  }

  console.log(`Subscription updated for business ${targetBusinessId}: ${subscription.status}`);

  // Map Stripe status to our status
  let status: 'active' | 'past_due' | 'canceled';
  if (subscription.status === 'active') {
    status = 'active';
  } else if (subscription.status === 'past_due') {
    status = 'past_due';
  } else if (['canceled', 'unpaid', 'incomplete_expired'].includes(subscription.status)) {
    status = 'canceled';
  } else {
    status = 'active'; // Default for trialing, etc.
  }

  // Update subscription record
  const { error: subError } = await supabase
    .from('subscriptions')
    .update({
      status,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (subError) {
    console.error('Failed to update subscription:', subError);
    return;
  }

  // Update ZIP claims based on status
  if (status === 'active') {
    // Activate any pending claims
    await supabase
      .from('zip_claims')
      .update({ status: 'active' })
      .eq('business_id', targetBusinessId)
      .eq('status', 'pending');
  } else if (status === 'canceled') {
    // Cancel active claims
    await supabase
      .from('zip_claims')
      .update({ status: 'canceled' })
      .eq('business_id', targetBusinessId)
      .in('status', ['pending', 'active']);

    console.log(`Canceled ZIP claims for business ${targetBusinessId}`);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const supabase = getSupabaseAdmin();

  console.log(`Subscription deleted: ${subscription.id}`);

  // Find and update subscription
  const { data: existingSub } = await supabase
    .from('subscriptions')
    .select('business_id')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (!existingSub) {
    console.error('Cannot find subscription to delete:', subscription.id);
    return;
  }

  // Update subscription status
  await supabase
    .from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscription.id);

  // Cancel all ZIP claims for this business
  await supabase
    .from('zip_claims')
    .update({ status: 'canceled' })
    .eq('business_id', existingSub.business_id)
    .in('status', ['pending', 'active']);

  console.log(`Canceled all ZIP claims for business ${existingSub.business_id}`);
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('Missing stripe-signature header');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify webhook signature and construct event
    let event: Stripe.Event;
    try {
      event = await constructWebhookEvent(rawBody, signature);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log(`Received Stripe webhook: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
