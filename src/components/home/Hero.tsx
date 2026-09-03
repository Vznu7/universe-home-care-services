'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { HeartPulse, UserCheck, ShieldCheck } from 'lucide-react';
import { BookingModal } from '@/components/booking/BookingModal';

export function Hero() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="relative bg-teal-50 pt-6 pb-10 md:pt-10 md:pb-14 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch lg:gap-12">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 py-4">
            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Compassionate Care,<br />
              <span className="text-teal-700">Right Where You Feel at Home</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              Trusted home healthcare support designed around the needs of your loved ones &mdash; delivered with compassion, professionalism, and care.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-10">
              <Button size="lg" onClick={() => setIsBookingOpen(true)}>
                Book an Appointment
              </Button>
              <a href={siteConfig.phoneHref}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white">
                  Call Us
                </Button>
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-start">
                <div className="p-2 bg-teal-100 text-teal-700 rounded-lg mb-2"><UserCheck className="w-5 h-5" /></div>
                <h4 className="font-semibold text-sm text-slate-800">Trained Professionals</h4>
              </div>
              <div className="flex flex-col items-start">
                <div className="p-2 bg-teal-100 text-teal-700 rounded-lg mb-2"><HeartPulse className="w-5 h-5" /></div>
                <h4 className="font-semibold text-sm text-slate-800">Personalized Care</h4>
              </div>
              <div className="flex flex-col items-start">
                <div className="p-2 bg-teal-100 text-teal-700 rounded-lg mb-2"><ShieldCheck className="w-5 h-5" /></div>
                <h4 className="font-semibold text-sm text-slate-800">Family-Focused</h4>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative min-h-[350px] lg:min-h-0 mt-8 lg:mt-0">
            <img 
              src="/hero-image.jpg" 
              alt="Universe Home Care Services Professional"
              className="rounded-2xl absolute inset-0 w-full h-full object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
}

