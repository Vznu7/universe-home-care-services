import { BookingForm } from '@/components/booking/BookingForm';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: 'Book a home care service or contact our care team today.',
};

export default function ContactPage() {
  return (
    <div className="min-h-[80vh] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Book a Care Service</h1>
          <p className="text-slate-600 text-lg">
            Fill out the form below and our care team will contact you shortly to confirm the details.
          </p>
        </div>
        
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
