'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { BookingModal } from '@/components/booking/BookingModal';

export function CTASection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="py-20 bg-teal-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Bring Better Care Home?</h2>
        <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Tell us what kind of support your family needs and our team will help you find the right care.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button 
            size="lg" 
            className="bg-white text-teal-800 hover:bg-slate-100 w-full sm:w-auto"
            onClick={() => setIsBookingOpen(true)}
          >
            Book an Appointment
          </Button>
          <a href={siteConfig.phoneHref} className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-teal-600 w-full">
              Call Us Now
            </Button>
          </a>
        </div>
      </div>
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
}

