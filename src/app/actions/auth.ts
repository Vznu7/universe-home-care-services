'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  // ADMIN LOGIN BYPASS
  if (email === 'universehomecareservices@gmail.com' && password === 'Vishnu1008@') {
    const cookieStore = await cookies();
    cookieStore.set('demo_admin_session', 'true', { path: '/' });
    revalidatePath('/admin', 'layout');
    redirect('/admin');
  }

  const supabase = await createClient();

  // Attempt to sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: 'Invalid email or password.' };
  }

  // Verify the user is in admin_users and is_active
  const { data: adminUser, error: adminError } = await supabase
    .from('admin_users')
    .select('is_active')
    .eq('user_id', data.user.id)
    .single();

  if (adminError || !adminUser || !adminUser.is_active) {
    // User authenticated but not authorized or inactive
    await supabase.auth.signOut();
    return { error: 'You do not have permission to access the admin portal.' };
  }

  revalidatePath('/admin', 'layout');
  redirect('/admin');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('demo_admin_session');

  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (e) {}
  
  revalidatePath('/', 'layout');
  redirect('/admin/login');
}
