'use client';

import { useState } from 'react';
import { updateLeadStatus, updateLeadNotes } from '@/app/actions/admin';
import { Button } from '@/components/ui/Button';

export function LeadStatusManager({ lead }: { lead: any }) {
  const [status, setStatus] = useState(lead.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const statuses = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'appointment_scheduled', label: 'Appointment Scheduled' },
    { value: 'service_confirmed', label: 'Service Confirmed' },
    { value: 'service_completed', label: 'Service Completed' },
    { value: 'not_proceeding', label: 'Not Proceeding' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const handleUpdate = async () => {
    setIsUpdating(true);
    setMessage('');
    const result = await updateLeadStatus(lead.id, status);
    setIsUpdating(false);

    if (result.error) {
      setMessage(`Error: ${result.error}`);
    } else {
      setMessage('Status updated successfully.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Update Status</h3>
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Current Status</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full p-2.5 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm bg-white text-slate-900"
          >
            {statuses.map(s => (
              <option key={s.value} value={s.value} className="text-slate-900">{s.label}</option>
            ))}
          </select>
        </div>
        <Button onClick={handleUpdate} disabled={isUpdating || status === lead.status}>
          {isUpdating ? 'Updating...' : 'Save Status'}
        </Button>
      </div>
      {message && (
        <p className={`mt-3 text-sm ${message.includes('Error') ? 'text-red-600' : 'text-teal-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export function LeadNotesManager({ lead }: { lead: any }) {
  const [notes, setNotes] = useState(lead.internal_notes || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    setIsUpdating(true);
    setMessage('');
    const result = await updateLeadNotes(lead.id, notes);
    setIsUpdating(false);

    if (result.error) {
      setMessage(`Error: ${result.error}`);
    } else {
      setMessage('Notes saved successfully.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Internal Notes (Private)</h3>
      <div className="space-y-4">
        <div>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            className="block w-full p-3 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm bg-slate-50 text-slate-900"
            placeholder="Add internal notes about the patient's condition, follow-up calls, quotations, etc..."
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            These notes are strictly private and only visible to authorized administrators.
          </p>
          <Button onClick={handleUpdate} disabled={isUpdating || notes === (lead.internal_notes || '')}>
            {isUpdating ? 'Saving...' : 'Save Notes'}
          </Button>
        </div>
        {message && (
          <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-teal-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
