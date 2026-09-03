import { notFound } from 'next/navigation';
import { team } from '@/data/team';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const member = team.find(m => m.slug === params.slug);
  if (!member) return { title: 'Team Member Not Found' };
  return {
    title: `${member.name} | ${siteConfig.name}`,
    description: member.role,
  };
}

export function generateStaticParams() {
  return team.map(member => ({
    slug: member.slug,
  }));
}

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = team.find(m => m.slug === params.slug);
  
  if (!member) {
    notFound();
  }

  return (
    <main className="py-24 bg-white min-h-[70vh]">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/about#team" className="text-teal-700 hover:underline mb-8 inline-block">&larr; Back to Team</Link>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/3">
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-square md:aspect-auto md:h-80">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2">{member.name}</h1>
            <p className="text-xl text-teal-700 font-medium mb-8">{member.role}</p>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-lg text-slate-600 leading-relaxed">
                {member.description}
              </p>
              <p className="text-slate-600 leading-relaxed mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <em>Detailed biography and credentials coming soon.</em>
              </p>
            </div>
            
            <Link href="/">
              <Button>Book an Appointment</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

