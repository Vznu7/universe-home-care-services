import { testimonials } from '@/data/testimonials';
import { Quote } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Happy Customers</h2>
          <p className="text-lg text-slate-600">
            Hear from families who have experienced our dedicated home healthcare services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
              <Quote className="w-10 h-10 text-teal-100 absolute top-6 right-6" />
              <p className="text-slate-700 mb-6 relative z-10 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{t.name}</h4>
                  <p className="text-sm text-slate-500">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

