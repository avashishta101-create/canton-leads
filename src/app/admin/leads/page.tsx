'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Lead {
  id: string;
  zip: string;
  full_name: string;
  phone: string;
  email: string | null;
  service_type: string;
  preferred_timing: string | null;
  details: string | null;
  assigned_business_id: string | null;
  created_at: string;
}

interface Business {
  id: string;
  name: string;
  email: string;
}

function AdminContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filter, setFilter] = useState<'all' | 'assigned' | 'unassigned'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [assigningLead, setAssigningLead] = useState<string | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<{ [leadId: string]: string }>({});

  const fetchData = async () => {
    if (!token) {
      setIsAuthorized(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/leads?token=${token}&filter=${filter}`);

      if (response.status === 401) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.success) {
        setIsAuthorized(true);
        setLeads(data.leads);
        setBusinesses(data.businesses);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, filter]);

  const handleAssign = async (leadId: string) => {
    const businessId = selectedBusiness[leadId];
    if (!businessId || !token) return;

    setAssigningLead(leadId);

    try {
      const response = await fetch(`/api/admin/assign?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, businessId }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh data
        fetchData();
        alert(
          data.emailSent
            ? 'Lead assigned and email sent!'
            : 'Lead assigned (email failed to send)'
        );
      } else {
        alert(`Failed to assign: ${data.error}`);
      }
    } catch (error) {
      alert('Failed to assign lead');
    } finally {
      setAssigningLead(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      timeZone: 'America/Detroit',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const getBusinessName = (businessId: string | null) => {
    if (!businessId) return null;
    const business = businesses.find((b) => b.id === businessId);
    return business?.name || 'Unknown';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            Invalid or missing admin token. Please check your access URL.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const unassignedCount = leads.filter((l) => !l.assigned_business_id).length;
  const assignedCount = leads.filter((l) => l.assigned_business_id).length;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage leads and assignments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Total Leads</p>
            <p className="text-3xl font-bold text-gray-900">{leads.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Assigned</p>
            <p className="text-3xl font-bold text-green-600">{assignedCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Unassigned</p>
            <p className="text-3xl font-bold text-orange-600">{unassignedCount}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {(['all', 'unassigned', 'assigned'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    filter === f
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  {f === 'unassigned' && unassignedCount > 0 && (
                    <span className="ml-2 bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs">
                      {unassignedCount}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Businesses Reference */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <h2 className="font-semibold text-gray-900 mb-2">Registered Businesses</h2>
          {businesses.length === 0 ? (
            <p className="text-gray-500 text-sm">No businesses registered yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {businesses.map((b) => (
                <span
                  key={b.id}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {b.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Leads List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No leads found for the selected filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      ZIP
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Service
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">{lead.full_name}</div>
                        {lead.details && (
                          <div className="text-xs text-gray-500 max-w-xs truncate">
                            {lead.details}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">{formatPhone(lead.phone)}</div>
                        {lead.email && (
                          <div className="text-xs text-gray-500">{lead.email}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{lead.zip}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">{lead.service_type}</div>
                        {lead.preferred_timing && (
                          <div className="text-xs text-gray-500">{lead.preferred_timing}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {lead.assigned_business_id ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {getBusinessName(lead.assigned_business_id)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Unassigned
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {!lead.assigned_business_id && businesses.length > 0 && (
                          <div className="flex items-center gap-2">
                            <select
                              value={selectedBusiness[lead.id] || ''}
                              onChange={(e) =>
                                setSelectedBusiness((prev) => ({
                                  ...prev,
                                  [lead.id]: e.target.value,
                                }))
                              }
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="">Select...</option>
                              {businesses.map((b) => (
                                <option key={b.id} value={b.id}>
                                  {b.name}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleAssign(lead.id)}
                              disabled={
                                !selectedBusiness[lead.id] || assigningLead === lead.id
                              }
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {assigningLead === lead.id ? '...' : 'Assign'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminLeadsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
