'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAgencyStore } from '../../store/useAgencyStore';

export default function ConsultationGateway() {
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const router = useRouter();
  const { initClientWithDetails } = useAgencyStore();

  const handleInitialize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !businessName.trim()) return;

    // Generate a unique ID for the client
    const clientId = `client-${Date.now()}`;
    
    // Initialize the client in our "database"
    initClientWithDetails(clientId, clientName, businessName);

    // Route to the personalized consultation engine
    router.push(`/c/${clientId}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto bg-[#0d9488]/20 text-[#1e293b] rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <i className="fa-solid fa-bolt text-2xl text-[#1e293b]"></i>
          </div>
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2 font-heading tracking-tight">New Consultation</h1>
          <p className="text-[#64748b] text-sm">Enter client details to initialize a dynamic blueprint.</p>
        </div>

        <form onSubmit={handleInitialize} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">Client Full Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Rahul Sharma" 
              className="w-full bg-[#f8fafc] border border-gray-200 text-[#1e293b] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 transition-all shadow-inner"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">Business Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Spice Route Restaurant" 
              className="w-full bg-[#f8fafc] border border-gray-200 text-[#1e293b] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 transition-all shadow-inner"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full premium-btn font-bold py-4 rounded-xl flex items-center justify-center gap-3 text-lg mt-4"
          >
            Initialize Blueprint <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
