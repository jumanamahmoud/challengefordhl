"use client";
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import FileUploadModal from '@/app/components/FileUploadModal';

export default function Dashboard() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchIncidents = async () => {
    setLoading(true);
    // Fetching exactly according to your schema screenshot
    const { data, error } = await supabase
      .from('incidents')
      .select('id, tracking_id, customer_name, issue_summary, priority, status, created_at, file_path, user_id')
      .order('created_at', { ascending: false });

    if (error) console.error("Error fetching data:", error);
    else setIncidents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const { filteredIncidents, stats } = useMemo(() => {
    const filtered = incidents.filter(i => 
      (i.tracking_id?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (i.issue_summary?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const stats = {
      total: incidents.length,
      notStarted: incidents.filter(i => i.status === 'Not Started').length,
      inProgress: incidents.filter(i => i.status === 'In Progress').length,
      resolved: incidents.filter(i => i.status === 'Resolved').length,
    };

    return { filteredIncidents: filtered, stats };
  }, [incidents, searchQuery]);

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Incident Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Total', count: stats.total },
              { label: 'Not Started', count: stats.notStarted },
              { label: 'In Progress', count: stats.inProgress },
              { label: 'Resolved', count: stats.resolved },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-bold">{stat.label}</p>
                <p className="text-2xl font-bold text-black">{stat.count}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <input 
            type="text"
            placeholder="Search ID or Issue..."
            className="px-4 py-2 w-96 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#D40511] outline-none text-black"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#D40511] text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition"
          >
            + Upload Incident
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Tracking ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Issue</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredIncidents.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-[#D40511] font-bold">{item.tracking_id}</td>
                  <td className="px-6 py-4 text-gray-800">{item.issue_summary}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <FileUploadModal onClose={() => { setIsModalOpen(false); fetchIncidents(); }} />}
    </main>
  );
}