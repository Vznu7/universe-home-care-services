import { getLeads } from '@/app/actions/admin';
import { LeadsTable } from '@/components/admin/LeadsTable';

export default async function AdminLeadsPage() {
  // Fetch all leads on server side. For V1 we assume number of leads is manageable without pagination.
  // In V2, we would pass search params to `getLeads` for server-side filtering/pagination.
  const leads = await getLeads();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Lead Management</h1>
        <p className="text-sm text-slate-500 mt-1">View and manage all incoming care requests.</p>
      </div>

      <LeadsTable initialLeads={leads} />
    </div>
  );
}
