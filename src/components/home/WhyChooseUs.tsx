import { CheckCircle2 } from 'lucide-react';

export function WhyChooseUs() {
  const reasons = [
    'Trained Care Professionals',
    'Personalized Care Plans',
    'Reliable Home Support',
    'Family-Centered Approach',
    'Clear Communication',
    'Ongoing Support & Monitoring',
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Care You Can Feel Confident About
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We understand that choosing a home healthcare provider is a significant decision. Our commitment is to deliver dependable, high-quality care that prioritizes the comfort and dignity of your loved ones.
            </p>
            
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-center text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 mr-3 shrink-0" />
                  <span className="font-medium">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/care.jpg" 
                alt="Healthcare professional caring for patient"
                className="object-cover w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

