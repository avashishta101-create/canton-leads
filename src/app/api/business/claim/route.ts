import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getStripe, getPriceId } from '@/lib/stripe';
import {
  businessClaimSchema,
  formatZodErrors,
  parseZipCodes,
  validateZipCount,
  cleanPhoneNumber,
} from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = businessClaimSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: formatZodErrors(validation.error) },
        { status: 400 }
      );
    }

    const data = validation.data;
    const supabase = getSupabaseAdmin();

    // Parse and validate ZIP codes
    const { valid: validZips, invalid: invalidZips } = parseZipCodes(data.zipCodes);

    if (invalidZips.length > 0) {
      return NextResponse.json(
        { success: false, error: `Invalid ZIP codes: ${invalidZips.join(', ')}` },
        { status: 400 }
      );
    }

    const countError = validateZipCount(validZips);
    if (countError) {
      return NextResponse.json({ success: false, error: countError }, { status: 400 });
    }

    // Check ZIP availability
    const { data: existingClaims } = await supabase
      .from('zip_claims')
      .select('zip, business_id')
      .in('zip', validZips)
      .in('status', ['pending', 'active']);

    if (existingClaims && existingClaims.length > 0) {
      const unavailableZips = existingClaims.map((c) => c.zip);
      return NextResponse.json(
        {
          success: false,
          error: `These ZIP codes are already claimed: ${unavailableZips.join(', ')}`,
          unavailableZips,
        },
        { status: 409 }
      );
    }

    // Upsert business by email
    const { data: existingBusiness } = await supabase
      .from('businesses')
      .select('*')
      .eq('email', data.email.toLowerCase())
      .single();

    let businessId: string;

    if (existingBusiness) {
      // Update existing business
      const { error: updateError } = await supabase
        .from('businesses')
        .update({
          name: data.businessName,
          contact_name: data.contactName,
          phone: cleanPhoneNumber(data.phone),
        })
        .eq('id', existingBusiness.id);

      if (updateError) {
        console.error('Failed to update business:', updateError);
        return NextResponse.json(
          { success: false, error: 'Failed to update business record' },
          { status: 500 }
        );
      }

      businessId = existingBusiness.id;
    } else {
      // Insert new business
      const { data: newBusiness, error: insertError } = await supabase
        .from('businesses')
        .insert({
          name: data.businessName,
          contact_name: data.contactName,
          email: data.email.toLowerCase(),
          phone: cleanPhoneNumber(data.phone),
        })
        .select()
        .single();

      if (insertError || !newBusiness) {
        console.error('Failed to create business:', insertError);
        return NextResponse.json(
          { success: false, error: 'Failed to create business record' },
          { status: 500 }
        );
      }

      businessId = newBusiness.id;
    }

    // Insert pending ZIP claims
    const zipClaimsToInsert = validZips.map((zip) => ({
      zip,
      business_id: businessId,
      status: 'pending' as const,
    }));

    const { error: claimsError } = await supabase.from('zip_claims').insert(zipClaimsToInsert);

    if (claimsError) {
      // Check if it's a unique constraint violation (race condition)
      if (claimsError.code === '23505') {
        return NextResponse.json(
          {
            success: false,
            error: 'One or more ZIP codes were claimed by another business. Please try again.',
          },
          { status: 409 }
        );
      }

      console.error('Failed to create ZIP claims:', claimsError);
      return NextResponse.json(
        { success: false, error: 'Failed to claim ZIP codes' },
        { status: 500 }
      );
    }

    // Create Stripe Checkout session
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
      customer_email: data.email.toLowerCase(),
      metadata: {
        business_id: businessId,
        requested_zips: validZips.join(','),
      },
      subscription_data: {
        metadata: {
          business_id: businessId,
          requested_zips: validZips.join(','),
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
    console.error('Error processing business claim:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
