'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { services } from '@/data/services';
import { Button } from '@/components/ui/Button';
import { BookingModal } from '@/components/booking/BookingModal';
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Actual Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <Image src="/logo.png" alt="Universe Home Care Services Logo" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            <div className="block">
              <div className="font-bold text-[13px] sm:text-xl text-teal-900 leading-tight max-w-[120px] sm:max-w-none whitespace-normal sm:whitespace-nowrap">{siteConfig.name}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button 
                className="flex items-center space-x-1 text-slate-700 hover:text-teal-700 font-medium"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <span>Our Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isServicesOpen && (
                <div 
                  className="absolute top-full left-0 w-64 pt-4"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="bg-white rounded-lg shadow-lg border p-2 flex flex-col space-y-1">
                    {services.map(s => (
                      <Link 
                        key={s.id} 
                        href={`/services/${s.slug}`}
                        className="px-4 py-2 hover:bg-teal-50 hover:text-teal-700 rounded-md text-sm text-slate-600 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="text-slate-700 hover:text-teal-700 font-medium">
              About Us
            </Link>
            
            <div className="relative group">
              <button 
                className="flex items-center space-x-1 text-slate-700 hover:text-teal-700 font-medium"
                onMouseEnter={() => setIsContactOpen(true)}
                onMouseLeave={() => setIsContactOpen(false)}
              >
                <span>Contact</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isContactOpen && (
                <div 
                  className="absolute top-full right-0 pt-4 w-56"
                  onMouseEnter={() => setIsContactOpen(true)}
                  onMouseLeave={() => setIsContactOpen(false)}
                >
                  <div className="bg-white rounded-lg shadow-lg border p-2 flex flex-col space-y-1">
                    <a href={siteConfig.phoneHref} className="flex items-center px-4 py-3 hover:bg-teal-50 rounded-md transition-colors">
                      <Phone className="w-4 h-4 mr-3 text-teal-700" />
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500">Call Us</span>
                        <span className="text-sm font-medium text-slate-800">{siteConfig.phone}</span>
                      </div>
                    </a>
                    <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-3 hover:bg-teal-50 rounded-md transition-colors">
                      <MessageCircle className="w-4 h-4 mr-3 text-green-600" />
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500">WhatsApp</span>
                        <span className="text-sm font-medium text-slate-800">Chat with us</span>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <Button onClick={() => setIsBookingOpen(true)}>Book Now</Button>
          </nav>

          {/* Mobile Phone & Menu Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <a href={siteConfig.phoneHref} className="flex items-center text-teal-700 bg-teal-50 px-2.5 py-1.5 rounded-md font-bold text-[13px]">
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              {siteConfig.phone}
            </a>
            <button 
              className="p-2 text-slate-600 bg-slate-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-slate-800">Our Services</span>
                <div className="pl-4 flex flex-col space-y-2 border-l-2 border-slate-100">
                  {services.map(s => (
                    <Link 
                      key={s.id} 
                      href={`/services/${s.slug}`}
                      className="text-sm text-slate-600 py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/about" className="font-semibold text-slate-800" onClick={() => setIsMobileMenuOpen(false)}>
                About Us
              </Link>
              <div className="pt-4 border-t flex flex-col space-y-3">
                <a href={siteConfig.phoneHref} className="flex items-center text-slate-700">
                  <Phone className="w-5 h-5 mr-3 text-teal-700" />
                  {siteConfig.phone}
                </a>
                <a href={siteConfig.whatsappHref} className="flex items-center text-slate-700">
                  <MessageCircle className="w-5 h-5 mr-3 text-green-600" />
                  Chat on WhatsApp
                </a>
              </div>
              <Button className="w-full" onClick={() => { setIsBookingOpen(true); setIsMobileMenuOpen(false); }}>
                Book Now
              </Button>
            </div>
          </div>
        )}
      </header>
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}

