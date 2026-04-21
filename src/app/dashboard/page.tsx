"use client";
import { useState } from 'react';

// Mock data to simulate what the RPA robot will eventually send
const MOCK_INCIDENTS = [
  { id: "DHL-9921", customer: "Amirul Azim", issue: "Damaged Package", status: "Pending", priority: "High" },
  { id: "DHL-4402", customer: "Sarah Chen", issue: "Incorrect Address", status: "Resolved", priority: "Low" },
  { id: "DHL-1189", customer: "Tansim Ahmed", issue: "Missing Item", status: "In Progress", priority: "Medium" },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Incident Dashboard</h1>
            <p className="text-gray-500">Monitor and manage automated DHL service tickets.</p>
          </div>
          <div className="flex gap-4">
            <input 
              type="text"
              placeholder="Search Tracking ID..."
              className="px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-[#D40511] outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <p className="text-sm text-gray-500 font-bold uppercase">Total Incidents</p>
            <p className="text-3xl font-bold text-black">124</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
            <p className="text-sm text-gray-500 font-bold uppercase">Pending RPA</p>
            <p className="text-3xl font-bold text-black">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <p className="text-sm text-gray-500 font-bold uppercase">Resolved</p>
            <p className="text-3xl font-bold text-black">112</p>
          </div>
        </div>

        {/* Incident Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Tracking ID</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Customer</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Issue Summary</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Priority</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MOCK_INCIDENTS.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-medium text-[#D40511]">{item.id}</td>
                  <td className="px-6 py-4 text-black">{item.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{item.issue}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-black">
                      <span className={`w-2 h-2 rounded-full ${
                        item.status === 'Resolved' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
