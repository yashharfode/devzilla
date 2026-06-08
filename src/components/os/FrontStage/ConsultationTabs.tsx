'use client';
import { useState } from 'react';
import LiveQuotingEngine from './LiveQuotingEngine';
import ClientBrief from './ClientBrief';
import ConsultationFooter from './ConsultationFooter';
import { useFirebaseSync } from '../../../store/firebaseSync';

export default function ConsultationTabs({ clientId }: { clientId: string }) {
  const [activeTab, setActiveTab] = useState<'brief' | 'quote'>('brief');
  
  // Initialize real-time bidirectional sync
  useFirebaseSync(clientId, 'front-stage');

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-2xl shadow-sm border border-gray-200 inline-flex">
            <button
              onClick={() => setActiveTab('brief')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'brief' 
                ? 'bg-[#1e293b] text-white shadow-md' 
                : 'text-[#64748b] hover:text-[#1e293b] hover:bg-gray-50'
              }`}
            >
              1. Client Requirements
            </button>
            <button
              onClick={() => setActiveTab('quote')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'quote' 
                ? 'bg-gradient-primary text-dark shadow-[0_0_15px_rgba(244,185,66,0.3)]' 
                : 'text-[#64748b] hover:text-[#1e293b] hover:bg-gray-50'
              }`}
            >
              2. Blueprint Architect
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'brief' && <ClientBrief clientId={clientId} onNext={() => setActiveTab('quote')} />}
          {activeTab === 'quote' && <LiveQuotingEngine clientId={clientId} />}
        </div>
      </div>
      
      {/* Footer is only visible during the quote or always? Usually always so they see price update. */}
      {activeTab === 'quote' && <ConsultationFooter />}
    </>
  );
}
