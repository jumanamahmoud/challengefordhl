import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

const formatDate = (value?: string) => {
  if (!value) return '—';
  return new Date(value).toLocaleString();
};

export default async function IncidentDetailsPage({ params }: Props) {
  // In Next.js 15, params is a Promise that must be awaited
  const { id } = await params;

  // Fetch incident by UUID from Supabase
  const { data: incident, error } = await supabase
    .from('incidents')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !incident) {
    console.error('Incident fetch error:', error);
    return notFound();
  }

  const knownFields = [
    'id', 'tracking_id', 'trackingId', 'customer_name', 
    'issue_summary', 'description', 'issue_description', 
    'details', 'priority', 'status', 'created_at', 'updated_at',
  ];

  const extraFields = Object.entries(incident).filter(
    ([key]) => !knownFields.includes(key)
  );

  const renderFieldValue = (value: unknown) => {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    return JSON.stringify(value);
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Incident Details</h1>
            <p className="text-sm text-gray-500 mt-2">UUID: <span className="font-mono">{id}</span></p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Main Properties */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wide text-gray-400">Tracking ID</h2>
                <p className="text-lg font-semibold text-gray-900">{incident.tracking_id || incident.trackingId || 'N/A'}</p>
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wide text-gray-400">Customer</h2>
                <p className="text-lg font-semibold text-gray-900">{incident.customer_name || 'Unknown'}</p>
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wide text-gray-400">Priority</h2>
                <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase mt-1 ${
                  incident.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {incident.priority || 'Low'}
                </span>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wide text-gray-400">Created</h2>
                <p className="text-lg font-semibold text-gray-900">{formatDate(incident.created_at)}</p>
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wide text-gray-400">Status</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-3 h-3 rounded-full ${incident.status === 'New' ? 'bg-blue-500' : 'bg-green-500'}`} />
                  <p className="text-lg font-semibold text-gray-900">{incident.status || 'New'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issue Content */}
        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-4">Issue Summary</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{incident.issue_summary || 'No summary provided.'}</p>
        </div>

        {(incident.description || incident.issue_description || incident.details) && (
          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">Detailed Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{incident.description || incident.issue_description || incident.details}</p>
          </div>
        )}

        {/* Dynamic Fields */}
        {extraFields.length > 0 && (
          <div className="mt-6">
            <h2 className="text-base font-bold text-gray-900 mb-4 px-2">Additional Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {extraFields.map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <p className="text-[10px] uppercase font-black text-gray-400 mb-1">{key.replace(/_/g, ' ')}</p>
                  <p className="text-sm text-gray-800 break-words">{renderFieldValue(value)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

