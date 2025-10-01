'use client';
import { useEffect, useState } from 'react';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  locale: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
  updated_at: string;
};

interface LeadsResponse {
  success: boolean;
  leads?: Lead[];
  error?: string;
}

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const data: LeadsResponse = await response.json();

      if (data.success && data.leads) {
        setLeads(data.leads);
      } else {
        setError(data.error || 'Failed to fetch leads');
      }
    } catch (err) {
      setError(`Network error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh leads
        fetchLeads();
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-purple-100 text-purple-800';
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Lead Management</h1>
          <p className="text-gray-400">Manage and track your leads from the contact form</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Source</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-800/30">
                    <td className="px-6 py-4 text-sm text-white font-medium">{lead.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <a href={`mailto:${lead.email}`} className="hover:text-primary-blue">
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{lead.company || '-'}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{lead.source}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={e => updateLeadStatus(lead.id, e.target.value)}
                        className="bg-gray-800 border border-gray-600 text-white text-sm rounded px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {leads.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No leads found</div>
            <div className="text-gray-500 text-sm mt-2">Leads will appear here when users submit the contact form</div>
          </div>
        )}
      </div>
    </div>
  );
}
