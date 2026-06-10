'use client';
import { useState, useEffect } from 'react';
import LiveQuotingEngine from './LiveQuotingEngine';
import ClientBrief from './ClientBrief';
import ConsultationFooter from './ConsultationFooter';
import { useAgencyStore } from '../../../store/useAgencyStore';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../config/firebase';
import { generateSummaryPDF } from '../../../lib/pdfGenerator';

export default function ConsultationTabs({ clientId }: { clientId: string }) {
  const [activeTab, setActiveTab] = useState<'brief' | 'quote'>('brief');
  const { currentClient, updateClientDetails } = useAgencyStore();
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (currentClient && (currentClient.clientName === 'New Client' || currentClient.businessName === 'Unknown Business')) {
      setShowIdentityModal(true);
    }
  }, [currentClient]);

  const handleSaveIdentity = () => {
    updateClientDetails({ clientName: clientName || 'Client', businessName: businessName || 'Business', clientPhone: clientPhone });
    setShowIdentityModal(false);
  };

  const handleSaveProposal = async () => {
    if (!currentClient) return;
    
    // Check if user is authenticated before attempting to save
    if (!auth.currentUser) {
      alert("❌ Authentication Required!\n\nYou are not currently logged in as an Admin on this browser. Please either:\n1. Open the Admin Panel in another tab and log in.\n2. Or use the 'Download PDF Proposal' button to save it locally.");
      return;
    }

    setIsSaving(true);
    try {
      await setDoc(doc(db, 'clients', currentClient.id), currentClient);
      localStorage.removeItem(`client_draft_${clientId}`);
      alert("✅ Proposal saved to Admin successfully!");
    } catch (e: any) {
      console.error(e);
      alert("❌ Failed to save. Please check your Firebase Rules in the console.\nError: " + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {showIdentityModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fade-in border border-gray-100">
            <h2 className="text-2xl font-bold text-[#1e293b] mb-2">Welcome Client! 👋</h2>
            <p className="text-[#64748b] mb-6">Let's set up your profile for this consultation.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#1e293b] mb-1">Your Name</label>
                <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#0d9488] focus:outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1e293b] mb-1">Business Name</label>
                <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#0d9488] focus:outline-none" placeholder="Spice Route" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1e293b] mb-1">Mobile Number</label>
                <input type="text" value={clientPhone} onChange={e => setClientPhone(e.target.value)} className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#0d9488] focus:outline-none" placeholder="+91..." />
              </div>
              <button onClick={handleSaveIdentity} className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold py-3 rounded-xl mt-4 transition-colors">Start Consultation</button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 py-6 pb-24">
        {/* Header Save Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div></div>
          <div className="flex gap-3">
            <button 
              onClick={() => currentClient && generateSummaryPDF(currentClient)}
              className="bg-white border-2 border-[#0d9488] text-[#0d9488] hover:bg-teal-50 font-bold py-2 px-6 rounded-lg shadow-sm flex items-center gap-2 transition-colors"
            >
              <i className="fa-solid fa-file-pdf"></i>
              Download PDF Proposal
            </button>
            <button 
              onClick={handleSaveProposal}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isSaving ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-cloud-arrow-up"></i>}
              Save Proposal to Admin
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-2xl shadow-sm border border-gray-200 inline-flex flex-wrap justify-center">
            <button
              onClick={() => setActiveTab('brief')}
              className={`px-6 md:px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'brief' 
                ? 'bg-[#1e293b] text-white shadow-md' 
                : 'text-[#64748b] hover:text-[#1e293b] hover:bg-gray-50'
              }`}
            >
              1. Client Requirements
            </button>
            <button
              onClick={() => setActiveTab('quote')}
              className={`px-6 md:px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
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
      
      {activeTab === 'quote' && <ConsultationFooter />}
    </>
  );
}
