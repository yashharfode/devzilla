'use client';
import { useAgencyStore } from '../../../store/useAgencyStore';
import Link from 'next/link';

export default function MasterCRM() {
  const { clients } = useAgencyStore();

  return (
    <div className="glass-card rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
      <div className="p-6 border-b border-gray-800 bg-[#0a1128] flex justify-between items-center">
        <h2 className="text-xl font-bold text-white"><i className="fa-solid fa-users text-primary mr-2"></i> Master CRM Dashboard</h2>
        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/30">
          {clients.length} Active Deals
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-900/80 text-gray-400 font-mono text-xs uppercase tracking-wider border-b border-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Client ID</th>
              <th className="px-6 py-4 font-semibold">Industry</th>
              <th className="px-6 py-4 font-semibold">Package</th>
              <th className="px-6 py-4 font-semibold">Quoted Price</th>
              <th className="px-6 py-4 font-semibold">Margin</th>
              <th className="px-6 py-4 font-semibold">Follow-up</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-800/40 transition-colors">
                <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  {client.id}
                </td>
                <td className="px-6 py-4">
                  <span className="bg-gray-800 px-2.5 py-1 rounded text-xs border border-gray-700 text-gray-300">
                    {client.industry}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {client.publicView.basePackage.replace('_', ' ')}
                  <div className="text-xs text-gray-500 mt-1">+{client.publicView.selectedAddons.length} Add-ons</div>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-white text-base">
                  ₹{client.publicView.finalPrice.toLocaleString('en-IN')}
                </td>
                <td className="px-6 py-4 font-mono text-green-400 font-medium">
                  ₹{client.privateView.margin.toLocaleString('en-IN')}
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">
                  {client.privateView.followUpSchedule ? (
                    <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded w-fit border border-yellow-500/20">
                      <i className="fa-regular fa-clock"></i> {client.privateView.followUpSchedule.replace('_', ' ')}
                    </span>
                  ) : (
                    <span className="text-gray-600">Not Set</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/consultation/${client.id}`} target="_blank" className="text-gray-400 hover:text-primary transition" title="View Consultation Front-Stage">
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                    <button className="text-gray-400 hover:text-white transition" title="Open Shadow Editor">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
