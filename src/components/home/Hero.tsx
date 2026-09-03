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
            <div className="inline-flex items-center space-x-2 bg-teal-100 text-teal-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm border border-teal-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-600"></span>
              </span>
              <span>24/7 Home Care Service Available</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight mb-4 md:mb-6">
              Compassionate Care,<br />
              <span className="text-teal-700">Right Where You Feel at Home</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 leading-relaxed max-w-xl">
              Trusted home healthcare support designed around the needs of your loved ones &mdash; delivered with compassion, professionalism, and care.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-8 md:mb-10">
              <Button size="lg" className="w-full text-[13px] sm:text-sm px-2" onClick={() => setIsBookingOpen(true)}>
                Book Now
              </Button>
              <a href={siteConfig.phoneHref} className="w-full">
                <Button variant="outline" size="lg" className="w-full bg-white text-[13px] sm:text-sm px-2">
                  Call Us
                </Button>
              </a>
            </div>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-teal-100 pt-6 mt-2">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="p-1.5 sm:p-2 bg-teal-100 text-teal-700 rounded-lg mb-2"><UserCheck className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                <h4 className="font-semibold text-[11px] sm:text-sm text-slate-800 leading-tight">Trained<br className="sm:hidden" /> Professionals</h4>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="p-1.5 sm:p-2 bg-teal-100 text-teal-700 rounded-lg mb-2"><HeartPulse className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                <h4 className="font-semibold text-[11px] sm:text-sm text-slate-800 leading-tight">Personalized<br className="sm:hidden" /> Care</h4>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="p-1.5 sm:p-2 bg-teal-100 text-teal-700 rounded-lg mb-2"><ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                <h4 className="font-semibold text-[11px] sm:text-sm text-slate-800 leading-tight">Family<br className="sm:hidden" /> Focused</h4>
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

