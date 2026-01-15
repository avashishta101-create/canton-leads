import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

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

export async function GET(request: NextRequest) {
  // Validate admin token
  if (!validateAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const url = new URL(request.url);
    const filter = url.searchParams.get('filter'); // 'assigned', 'unassigned', or 'all'

    // Build query
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter === 'assigned') {
      query = query.not('assigned_business_id', 'is', null);
    } else if (filter === 'unassigned') {
      query = query.is('assigned_business_id', null);
    }

    const { data: leads, error } = await query;

    if (error) {
      console.error('Failed to fetch leads:', error);
      return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }

    // Fetch businesses for reference
    const { data: businesses } = await supabase
      .from('businesses')
      .select('id, name, email')
      .order('name');

    return NextResponse.json({
      success: true,
      leads: leads || [],
      businesses: businesses || [],
    });
  } catch (error) {
    console.error('Admin leads error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
