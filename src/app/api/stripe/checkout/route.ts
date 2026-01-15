import { NextRequest, NextResponse } from 'next/server';
import { getStripe, getPriceId } from '@/lib/stripe';

// This route can be used for creating checkout sessions programmatically
// The main flow uses /api/business/claim which creates the session directly

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessId, email, zips } = body;

    if (!businessId || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const priceId = getPriceId();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        business_id: businessId,
        requested_zips: zips || '',
      },
      subscription_data: {
        metadata: {
          business_id: businessId,
          requested_zips: zips || '',
        },
      },
      success_url: `${siteUrl}/business/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/business/canceled`,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
