'use server';

import { supabase } from '@/lib/supabase/client';
import { bookingSchema } from '@/lib/validations/booking';

export async function submitBooking(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      city: formData.get('city') as string,
      service: formData.get('service') as string,
      preferred_date: (formData.get('preferred_date') as string) || undefined,
      preferred_time: (formData.get('preferred_time') as string) || undefined,
      care_details: (formData.get('care_details') as string) || undefined,
      message: (formData.get('message') as string) || undefined,
    };

    const validatedData = bookingSchema.parse(data);

    if (supabase) {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: validatedData.name,
            phone: validatedData.phone,
            city: validatedData.city,
            service: validatedData.service,
            date: validatedData.preferred_date,
            time: validatedData.preferred_time,
            care_details: validatedData.care_details,
            message: validatedData.message,
            status: 'new'
          }
        ]);
        
      if (error) {
        console.error('Supabase error:', error);
        return { success: false, error: 'Failed to submit request. Please try again later.' };
      }
    } else {
      console.warn('Supabase credentials not configured. Mocking success for booking request:', validatedData);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Sync with Google Sheets via Webhook
    try {
      await fetch('https://script.google.com/macros/s/AKfycbylzk1ULZgqw7AN_LoryFXPzmAy9-vmUj827g8xYUqITVxPziK_nTw5EcdO4s8nat8c/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });
    } catch (sheetError) {
      console.error('Failed to sync to Google Sheets:', sheetError);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Validation or Server Error:', error);
    return { success: false, error: error.message || 'Invalid input data.' };
  }
}

