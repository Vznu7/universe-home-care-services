import { getLeadDetails } from '@/app/actions/admin';
import Link from 'next/link';
import { ChevronLeft, User, Phone, MapPin, Calendar, Activity, MessageSquare } from 'lucide-react';
import { LeadStatusManager, LeadNotesManager, LeadDeleteManager } from '@/components/admin/LeadManagers';

export default async function LeadDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  let lead = null;
  let error = null;

  try {
    lead = await getLeadDetails(id);
  } catch (e: any) {
    error = e.message;
  }

  if (error || !lead) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-slate-800">Lead not found</h2>
        <p className="text-slate-500 mt-2">The requested lead does not exist or you don't have permission to view it.</p>
        <Link href="/admin/leads" className="text-teal-600 hover:underline mt-4 inline-block">Return to Leads</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <Link href="/admin/leads" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-teal-600 mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Leads
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-900">Lead Details</h1>
          <div className="text-sm text-slate-500">
            Created: {new Date(lead.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-teal-600" />
            Customer Information
          </h3>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-slate-500">Full Name</dt>
              <dd className="mt-1 text-base text-slate-900">{lead.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500">Phone Number</dt>
              <dd className="mt-1 text-base text-slate-900 flex items-center">
                <Phone className="w-4 h-4 mr-1 text-slate-400" />
                <a href={`tel:${lead.phone}`} className="hover:text-teal-600">{lead.phone}</a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500">City</dt>
              <dd className="mt-1 text-base text-slate-900 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                {lead.city}
              </dd>
            </div>
          </dl>
        </div>

        {/* Service Information */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-teal-600" />
            Service Information
          </h3>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-slate-500">Requested Service</dt>
              <dd className="mt-1 text-base font-medium text-teal-700 bg-teal-50 inline-block px-3 py-1 rounded-md">
                {lead.service}
              </dd>
            </div>
            {(lead.preferred_date || lead.preferred_time) && (
              <div>
                <dt className="text-sm font-medium text-slate-500">Preferred Schedule</dt>
                <dd className="mt-1 text-base text-slate-900 flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-slate-400" />
                  {lead.preferred_date ? new Date(lead.preferred_date).toLocaleDateString() : 'Any Date'}
                  {lead.preferred_time ? ` at ${lead.preferred_time}` : ''}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Care Details & Message */}
      {(lead.care_details || lead.message) && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-teal-600" />
            Additional Requirements
          </h3>
          <dl className="space-y-6">
            {lead.care_details && (
              <div>
                <dt className="text-sm font-medium text-slate-500 mb-1">Care Details</dt>
                <dd className="text-base text-slate-900 bg-slate-50 p-4 rounded-lg border border-slate-100 whitespace-pre-wrap">
                  {lead.care_details}
                </dd>
              </div>
            )}
            {lead.message && (
              <div>
                <dt className="text-sm font-medium text-slate-500 mb-1">Message</dt>
                <dd className="text-base text-slate-900 bg-slate-50 p-4 rounded-lg border border-slate-100 whitespace-pre-wrap">
                  {lead.message}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}

      <LeadStatusManager lead={lead} />
      <LeadNotesManager lead={lead} />
      <LeadDeleteManager leadId={lead.id} />

    </div>
  );
}
