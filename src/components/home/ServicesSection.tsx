import Link from 'next/link';
import { services } from '@/data/services';
import { ArrowRight } from 'lucide-react';

export function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
          <p className="text-lg text-slate-600">
            Comprehensive home healthcare solutions tailored to your unique requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(service => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="group bg-slate-50 rounded-xl p-8 transition-all hover:shadow-lg hover:bg-teal-50 border border-slate-100">
                <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.name}</h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-teal-700 font-medium text-sm group-hover:text-teal-800 transition-colors"
                >
                  Explore Service
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

