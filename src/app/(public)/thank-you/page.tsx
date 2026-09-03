import Link from 'next/link';
import { CheckCircle2, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Thank You | Universe Home Care Services',
  robots: {
    index: false,
    follow: false,
  }
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-20 h-20 text-teal-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h1>
        
        <p className="text-slate-600 mb-8 text-lg">
          Thank you for reaching out to Universe Home Care Services. Our care team will review your request and contact you shortly to confirm the details.
        </p>
        
        <Link href="/">
          <Button className="w-full flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
