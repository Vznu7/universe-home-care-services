import { Eye, Target } from 'lucide-react';

export function VisionMission() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To make compassionate, reliable, and accessible home healthcare a trusted choice for families, ensuring everyone can heal and age with dignity in their own homes.
            </p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To provide personalized home-based care through trained professionals, responsible processes, and a strong commitment to the well-being of our patients and their families.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

