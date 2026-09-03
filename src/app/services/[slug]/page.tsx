import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ServiceBookingButton } from '@/components/services/ServiceBookingButton';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = services.find(s => s.slug === resolvedParams.slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.name} | ${siteConfig.name}`,
    description: service.description,
  };
}

export function generateStaticParams() {
  return services.map(service => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = services.find(s => s.slug === resolvedParams.slug);
  
  if (!service) {
    notFound();
  }

  return (
    <main className="bg-[#FAF8F5] min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4 pt-6 pb-12 md:pt-8 md:pb-16">
        
        {/* Breadcrumbs */}
        <div className="mb-6">
          <div className="text-xs font-bold text-teal-700 tracking-widest uppercase mb-2">
            CARE AT HOME • SINCE 2013
          </div>
          <div className="flex items-center text-sm text-slate-500 space-x-2">
            <Link href="/" className="hover:text-teal-700 transition-colors font-semibold">Home</Link>
            <span>&gt;</span>
            <span className="text-slate-600">{service.name}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2937] leading-tight mb-4">
              {service.name}
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
              {service.description}
            </p>
            
            <ServiceBookingButton serviceName={service.name} />
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[280px] md:h-[350px] lg:h-[400px] w-full">
              {/* Fallback pattern if image is missing */}
              <div className="absolute inset-0 bg-teal-100" />
              {(service as any).image && (
                <img 
                  src={(service as any).image} 
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              {/* Fade Overlay like in reference */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/40 mix-blend-overlay"></div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}

