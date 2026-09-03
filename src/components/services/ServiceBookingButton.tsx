'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { BookingModal } from '@/components/booking/BookingModal';
import { Calendar } from 'lucide-react';

export function ServiceBookingButton({ serviceName }: { serviceName: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        size="lg" 
        className="bg-[#f05c36] hover:bg-[#d84e2a] text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-[#f05c36]/30 flex items-center gap-2 font-bold tracking-wide"
        onClick={() => setIsModalOpen(true)}
      >
        <Calendar className="w-5 h-5" />
        BOOK APPOINTMENT
      </Button>
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialService={serviceName} 
      />
    </>
  );
}
