import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendLeadNotificationEmail } from '@/lib/email';
import type { Lead, Business } from '@/types';

// Validate admin token
function validateAdminToken(request: NextRequest): boolean {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    console.error('ADMIN_TOKEN not configured');
    return false;
  }

  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  return token === adminToken;
}

export async function POST(request: NextRequest) {
  // Validate admin token
  if (!validateAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { leadId, businessId } = body;

    if (!leadId || !businessId) {
      return NextResponse.json(
        { error: 'leadId and businessId are required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Verify lead exists
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Verify business exists
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', businessId)
      .single();

    if (businessError || !business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    // Update lead assignment
    const { error: updateError } = await supabase
      .from('leads')
      .update({ assigned_business_id: businessId })
      .eq('id', leadId);

    if (updateError) {
      console.error('Failed to assign lead:', updateError);
      return NextResponse.json({ error: 'Failed to assign lead' }, { status: 500 });
    }

    // Send email notification
    const updatedLead: Lead = {
      ...lead,
      assigned_business_id: businessId,
    };

    const emailSent = await sendLeadNotificationEmail(updatedLead, business as Business);

    return NextResponse.json({
      success: true,
      message: 'Lead assigned successfully',
      emailSent,
    });
  } catch (error) {
    console.error('Admin assign error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
