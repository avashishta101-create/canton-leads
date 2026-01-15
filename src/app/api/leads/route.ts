import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { leadSubmissionSchema, formatZodErrors, cleanPhoneNumber } from '@/lib/validation';
import { sendLeadNotificationEmail } from '@/lib/email';
import type { Business, Lead } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = leadSubmissionSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: formatZodErrors(validation.error) },
        { status: 400 }
      );
    }

    const data = validation.data;
    const supabase = getSupabaseAdmin();

    // Insert lead into database
    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert({
        zip: data.zip,
        full_name: data.fullName,
        phone: cleanPhoneNumber(data.phone),
        email: data.email || null,
        service_type: data.serviceType,
        preferred_timing: data.preferredTiming || null,
        details: data.details || null,
        assigned_business_id: null,
      })
      .select()
      .single();

    if (insertError || !lead) {
      console.error('Failed to insert lead:', insertError);
      return NextResponse.json(
        { success: false, error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    // Attempt to find an eligible business for this ZIP
    let assigned = false;
    let business: Business | null = null;

    // Find active ZIP claim with active subscription
    const { data: eligibleClaim } = await supabase
      .from('zip_claims')
      .select(`
        business_id,
        businesses!inner (
          id,
          name,
          contact_name,
          email,
          phone
        )
      `)
      .eq('zip', data.zip)
      .eq('status', 'active')
      .single();

    if (eligibleClaim?.business_id) {
      // Check if business has active subscription
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('business_id', eligibleClaim.business_id)
        .eq('status', 'active')
        .gt('current_period_end', new Date().toISOString())
        .single();

      if (subscription) {
        // Assign lead to business
        const { error: updateError } = await supabase
          .from('leads')
          .update({ assigned_business_id: eligibleClaim.business_id })
          .eq('id', lead.id);

        if (!updateError) {
          assigned = true;
          // Get full business details
          const { data: businessData } = await supabase
            .from('businesses')
            .select('*')
            .eq('id', eligibleClaim.business_id)
            .single();

          business = businessData;

          // Send email notification (don't fail lead creation if email fails)
          if (business) {
            const leadWithAssignment: Lead = {
              ...lead,
              assigned_business_id: eligibleClaim.business_id,
            };
            await sendLeadNotificationEmail(leadWithAssignment, business);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      assigned,
      message: assigned
        ? 'Lead submitted and assigned to provider'
        : 'Lead submitted successfully',
    });
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
