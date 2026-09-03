import { PhoneCall, ClipboardCheck, Home, ActivitySquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function HowWeWork() {
  const steps = [
    {
      id: 1,
      title: 'Book or call us',
      description: `Tell us the care you need - book online in minutes or speak to a care advisor on ${siteConfig.phone}.`,
      icon: PhoneCall,
    },
    {
      id: 2,
      title: 'Clinical assessment',
      description: 'Our clinical team understands the patient\'s condition and matches the right professional for it.',
      icon: ClipboardCheck,
    },
    {
      id: 3,
      title: 'Care begins at home',
      description: 'A background-verified professional arrives at your doorstep with a personalised care plan.',
      icon: Home,
    },
    {
      id: 4,
      title: 'Ongoing follow-up',
      description: 'Regular progress reviews keep the plan on track - and adjust it as recovery advances.',
      icon: ActivitySquare,
    }
  ];

  return (
    <section className="py-24 bg-teal-900 text-white relative">
      {/* Optional faint dot pattern background could go here */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-teal-400 font-semibold tracking-widest text-xs uppercase mb-3">A Simple, Guided Process</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How {siteConfig.name} Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative bg-teal-800/50 rounded-xl p-6 border border-teal-700/50 hover:bg-teal-800 transition-colors">
                <div className="absolute right-4 top-2 text-8xl font-bold text-teal-700/30 select-none z-0">
                  {step.id}
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-teal-700/50 rounded-lg flex items-center justify-center border border-teal-600/50 text-teal-200 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

