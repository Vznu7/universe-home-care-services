'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// Mock Data for Demo Mode
const MOCK_LEADS = [
  { id: '1', name: 'John Doe', phone: '9876543210', city: 'Coimbatore', service: 'Elder Care', preferred_date: '2026-10-10', preferred_time: 'Morning', status: 'new', created_at: new Date().toISOString(), care_details: 'Needs help with daily activities.', internal_notes: 'Will call back tomorrow.' },
  { id: '2', name: 'Jane Smith', phone: '9876543211', city: 'Chennai', service: 'Home Nursing', preferred_date: '2026-10-12', preferred_time: 'Afternoon', status: 'contacted', created_at: new Date(Date.now() - 86400000).toISOString(), care_details: 'Post-surgery care needed.', internal_notes: '' },
  { id: '3', name: 'Ramesh Kumar', phone: '9876543212', city: 'Coimbatore', service: 'Physiotherapy', preferred_date: '2026-10-15', preferred_time: 'Evening', status: 'appointment_scheduled', created_at: new Date(Date.now() - 172800000).toISOString(), care_details: 'Knee replacement recovery.', internal_notes: 'Assigned to Dr. Sarah.' }
];

async function isDemoMode() {
  const cookieStore = await cookies();
  return cookieStore.get('demo_admin_session')?.value === 'true';
}

async function checkIsAdmin() {
  if (await isDemoMode()) return true;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('is_active')
      .eq('user_id', user.id)
      .single();

    return adminUser?.is_active === true;
  } catch (e) {
    return false;
  }
}

export async function getDashboardStats() {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  if (await isDemoMode()) {
    return { total: 3, new: 1, contacted: 1, scheduled: 1, confirmed: 0, completed: 0 };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from('leads').select('status, created_at');
  if (error) throw new Error('Failed to fetch stats');

  return {
    total: data.length,
    new: data.filter(d => d.status === 'new').length,
    contacted: data.filter(d => d.status === 'contacted').length,
    scheduled: data.filter(d => d.status === 'appointment_scheduled').length,
    confirmed: data.filter(d => d.status === 'service_confirmed').length,
    completed: data.filter(d => d.status === 'service_completed').length,
  };
}

export async function getLeads(limit?: number, status?: string) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  if (await isDemoMode()) {
    let leads = [...MOCK_LEADS];
    if (status && status !== 'all') leads = leads.filter(l => l.status === status);
    if (limit) leads = leads.slice(0, limit);
    return leads;
  }

  const supabase = await createClient();
  let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
  if (limit) query = query.limit(limit);
  if (status && status !== 'all') query = query.eq('status', status);

  const { data, error } = await query;
  if (error) throw new Error('Failed to fetch leads');
  return data;
}

export async function getLeadDetails(id: string) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  if (await isDemoMode()) {
    const lead = MOCK_LEADS.find(l => l.id === id);
    if (!lead) throw new Error('Lead not found');
    return lead;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();
  if (error) throw new Error('Failed to fetch lead details');
  return data;
}

export async function updateLeadStatus(id: string, status: string) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) return { error: 'Unauthorized' };

  if (await isDemoMode()) {
    revalidatePath('/admin/leads');
    revalidatePath(`/admin/leads/${id}`);
    return { success: true };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('leads').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
  if (error) return { error: 'Failed to update status' };

  revalidatePath('/admin/leads');
  revalidatePath(`/admin/leads/${id}`);
  return { success: true };
}

export async function updateLeadNotes(id: string, notes: string) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) return { error: 'Unauthorized' };

  if (await isDemoMode()) {
    revalidatePath(`/admin/leads/${id}`);
    return { success: true };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('leads').update({ internal_notes: notes, updated_at: new Date().toISOString() }).eq('id', id);
  if (error) return { error: 'Failed to update notes' };

  revalidatePath(`/admin/leads/${id}`);
  return { success: true };
}
