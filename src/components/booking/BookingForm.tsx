'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, type BookingFormData } from '@/lib/validations/booking';
import { submitBooking } from '@/app/actions/booking';
import { services } from '@/data/services';
import { Button } from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export function BookingForm({ onSuccess, initialService }: { onSuccess: () => void, initialService?: string }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, trigger, setValue, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: initialService || '',
    }
  });

  useEffect(() => {
    if (initialService) {
      setValue('service', initialService);
    }
  }, [initialService, setValue]);

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ['name', 'phone', 'city'];
    if (step === 2) fieldsToValidate = ['service', 'preferred_date', 'preferred_time'];
    
    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setServerError('');
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value as string);
    });

    const result = await submitBooking(formData);
    
    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
      onSuccess();
    } else {
      setServerError(result.error || 'Something went wrong.');
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-teal-600 mb-4" />
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Thank you! Your request has been received.</h3>
        <p className="text-slate-600">Your care team will contact you shortly to confirm details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">{serverError}</div>}
      
      {/* STEP 1 */}
      <div className={step === 1 ? 'block' : 'hidden'}>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Step 1: Contact Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input {...register('name')} className="w-full p-2 border rounded-md text-slate-900 bg-white" placeholder="Your full name" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
            <input {...register('phone')} className="w-full p-2 border rounded-md text-slate-900 bg-white" placeholder="Your mobile number" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
            <input {...register('city')} className="w-full p-2 border rounded-md text-slate-900 bg-white" placeholder="e.g. Coimbatore" />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
          </div>
        </div>
      </div>

      {/* STEP 2 */}
      <div className={step === 2 ? 'block' : 'hidden'}>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Step 2: Care Requirement</h3>
        <div className="space-y-4">
          {!initialService ? (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Required Service</label>
              <select {...register('service')} className="w-full p-2 border rounded-md bg-white text-slate-900">
                <option value="">Select a service</option>
                {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Required Service</label>
              <input type="hidden" {...register('service')} />
              <div className="w-full p-2 border rounded-md bg-slate-50 text-slate-700 font-medium">
                {initialService}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
              <input type="date" {...register('preferred_date')} className="w-full p-2 border rounded-md text-slate-900 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Time</label>
              <input type="time" {...register('preferred_time')} className="w-full p-2 border rounded-md text-slate-900 bg-white" />
            </div>
          </div>
        </div>
      </div>

      {/* STEP 3 */}
      <div className={step === 3 ? 'block' : 'hidden'}>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Step 3: Additional Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Care Requirements / Details</label>
            <textarea {...register('care_details')} rows={3} className="w-full p-2 border rounded-md text-slate-900 bg-white" placeholder="Briefly describe the condition or specific needs..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Additional Message</label>
            <textarea {...register('message')} rows={2} className="w-full p-2 border rounded-md text-slate-900 bg-white" placeholder="Any other information we should know..."></textarea>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="flex justify-between pt-4 border-t">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
        ) : <div></div>}
        
        {step < 3 ? (
          <Button type="button" onClick={nextStep}>Next Step</Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        )}
      </div>
    </form>
  );
}

