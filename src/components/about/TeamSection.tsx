import Link from 'next/link';
import { team } from '@/data/team';
import { ArrowRight } from 'lucide-react';

export function TeamSection() {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-slate-600">
            The dedicated professionals behind our commitment to excellent home healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map(member => (
            <div key={member.id} className="group bg-slate-50 rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-teal-700 font-medium text-sm mb-4">{member.role}</p>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                  {member.description}
                </p>
                <Link 
                  href={`/team/${member.slug}`}
                  className="inline-flex items-center text-teal-700 font-medium text-sm hover:text-teal-800 transition-colors"
                >
                  Know More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

