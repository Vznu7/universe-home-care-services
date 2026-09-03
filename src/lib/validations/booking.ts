import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15),
  city: z.string().min(2, 'City is required').max(50),
  service: z.string().min(1, 'Please select a service'),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  care_details: z.string().max(1000).optional(),
  message: z.string().max(1000).optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

