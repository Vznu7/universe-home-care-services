import { getDashboardStats, getLeads } from '@/app/actions/admin';
import Link from 'next/link';
import { FileText, Users, CalendarCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const recentLeads = await getLeads(5); // Get top 5 recent leads

  const statCards = [
    { name: 'Total Leads', value: stats.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'New Leads', value: stats.new, icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
    { name: 'Contacted', value: stats.contacted, icon: FileText, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { name: 'Scheduled', value: stats.scheduled, icon: CalendarCheck, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Confirmed', value: stats.confirmed, icon: CheckCircle2, color: 'text-teal-600', bg: 'bg-teal-100' },
    { name: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of your care requests.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-auto">
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm font-medium text-slate-500 mt-1">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-900">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm font-medium text-teal-600 hover:text-teal-700">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500">
                    No leads found. New booking requests will appear here.
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/admin/leads/${lead.id}`} className="text-sm font-medium text-teal-600 hover:text-teal-800">
                        {lead.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {lead.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-slate-100 text-slate-800">
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
