'use client';
import { useState, useEffect } from 'react';
import { useAgencyStore } from '../../../store/useAgencyStore';
import DiscountEngine from './DiscountEngine';
import AIAssistant from './AIAssistant';

export default function ShadowEditor({ clientId }: { clientId: string }) {
  const { currentClient, selectClient, addDiscount, updateInternalNotes, setDealStatus, setUrgencyBanner, toggleCompetitorMatrix, setPaymentMilestone, setFollowUpSchedule } = useAgencyStore();
  
  const [discountAmt, setDiscountAmt] = useState('');
  const [discountReason, setDiscountReason] = useState('');
  const [notes, setNotes] = useState(currentClient?.privateView.internalNotes || '');
  const [urgencyText, setUrgencyText] = useState(currentClient?.publicView.urgencyBanner || '');

  useEffect(() => {
    if (!currentClient || currentClient.id !== clientId) {
      selectClient(clientId);
    }
  }, [clientId, currentClient, selectClient]);

  if (!currentClient || currentClient.id !== clientId) {
    return <div className="text-gray-500 animate-pulse p-6">Loading Shadow Editor...</div>;
  }

  const handleAddDiscount = () => {
    if (discountAmt && discountReason) {
      addDiscount(Number(discountAmt), discountReason);
      setDiscountAmt('');
      setDiscountReason('');
    }
  };

  const handleSaveNotes = () => {
    updateInternalNotes(notes);
    alert('Internal notes saved securely.');
  };

  return (
    <div className="glass-card rounded-2xl border border-gray-800 p-6 mt-8 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-orange-500/50"></div>
      
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <i className="fa-solid fa-user-secret text-red-400"></i> Shadow Editor
        </h3>
        <span className="font-mono bg-gray-900 px-3 py-1 rounded-full text-gray-400 text-sm border border-gray-800">
          Editing: {currentClient.id}
        </span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Margin & Discounts */}
        <div>
          <div className="bg-[#050914] p-5 rounded-xl border border-gray-800 mb-6 shadow-inner">
            <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">Live Margin Tracking</h4>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400">Raw Base Cost:</span>
              <span className="font-mono text-white">₹{currentClient.privateView.baseCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400">Total Hidden Discounts:</span>
              <span className="font-mono text-red-400">-₹{currentClient.privateView.discounts.reduce((a, b) => a + b.amount, 0).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-800 mt-2">
              <span className="text-white font-bold">True Agency Margin:</span>
              <span className="font-mono text-green-400 font-bold text-2xl drop-shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                ₹{currentClient.privateView.margin.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <DiscountEngine clientId={clientId} />
        </div>

        {/* Right Column: Internal Notes */}
        <div className="flex flex-col">
          <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Private Intel & Strategy</h4>
          
          <div className="mb-4 grid grid-cols-3 gap-2">
            <button 
              onClick={() => setDealStatus('negotiating')}
              className={`py-2 text-xs font-bold rounded-lg transition-colors border ${currentClient.privateView.dealStatus === 'negotiating' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' : 'bg-gray-800/50 text-gray-400 border-gray-800 hover:bg-gray-800'}`}
            >
              Negotiating
            </button>
            <button 
              onClick={() => setDealStatus('won')}
              className={`py-2 text-xs font-bold rounded-lg transition-colors border ${currentClient.privateView.dealStatus === 'won' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-gray-800/50 text-gray-400 border-gray-800 hover:bg-gray-800'}`}
            >
              Deal Won
            </button>
            <button 
              onClick={() => setDealStatus('lost')}
              className={`py-2 text-xs font-bold rounded-lg transition-colors border ${currentClient.privateView.dealStatus === 'lost' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-gray-800/50 text-gray-400 border-gray-800 hover:bg-gray-800'}`}
            >
              Deal Lost
            </button>
          </div>

          <textarea 
            className="w-full h-24 bg-[#050914] border border-gray-800 rounded-xl p-4 text-gray-300 text-sm focus:outline-none focus:border-primary/50 resize-none custom-scrollbar mb-4"
            placeholder="Log client budget constraints, strict requirements, or automated follow-up strategies here..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          ></textarea>
          
          <div className="flex gap-4 mb-6">
            <button 
              onClick={handleSaveNotes}
              className="flex-grow bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 rounded-lg transition text-sm flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-floppy-disk"></i> Save Notes
            </button>
            <button className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 font-bold py-2 px-6 rounded-lg transition text-sm flex items-center justify-center gap-2">
               Clone Config <i className="fa-solid fa-copy"></i>
            </button>
          </div>
          
          {/* AI Intelligence Integration */}
          <AIAssistant industry={currentClient.industry} />

          <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4 border-b border-gray-800 pb-2 mt-6">Deal-Closing Artillery</h4>
          
          <div className="space-y-4">
            <div className="bg-[#050914] p-4 rounded-xl border border-gray-800">
              <label className="text-xs font-bold text-gray-400 block mb-2">Deal Urgency Injector</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={urgencyText}
                  onChange={(e) => setUrgencyText(e.target.value)}
                  placeholder="e.g. Special Offer Expires in 24h"
                  className="flex-grow bg-black border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/50"
                />
                <button 
                  onClick={() => setUrgencyBanner(urgencyText || null)}
                  className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                >
                  Inject
                </button>
              </div>
            </div>

            <div className="bg-[#050914] p-4 rounded-xl border border-gray-800 flex justify-between items-center">
              <div>
                <h5 className="text-sm font-bold text-gray-300">Competitor Comparison</h5>
                <p className="text-[10px] text-gray-500 mt-0.5">Show DevZilla vs Generic Agency matrix on front-stage</p>
              </div>
              <button 
                onClick={() => toggleCompetitorMatrix()}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${currentClient.publicView.showCompetitorMatrix ? 'bg-primary' : 'bg-gray-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${currentClient.publicView.showCompetitorMatrix ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>

            <div className="bg-[#050914] p-4 rounded-xl border border-gray-800">
              <label className="text-xs font-bold text-gray-400 block mb-2">Dynamic Payment Milestones</label>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => setPaymentMilestone('100')} className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${currentClient.publicView.paymentMilestone === '100' ? 'bg-[#0d9488]/20 border-[#0d9488] text-[#0d9488]' : 'bg-gray-800/50 border-gray-800 text-gray-400'}`}>100% Upfront</button>
                <button onClick={() => setPaymentMilestone('50_50')} className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${currentClient.publicView.paymentMilestone === '50_50' ? 'bg-[#0d9488]/20 border-[#0d9488] text-[#0d9488]' : 'bg-gray-800/50 border-gray-800 text-gray-400'}`}>50/50 Split</button>
                <button onClick={() => setPaymentMilestone('40_30_30')} className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${currentClient.publicView.paymentMilestone === '40_30_30' ? 'bg-[#0d9488]/20 border-[#0d9488] text-[#0d9488]' : 'bg-gray-800/50 border-gray-800 text-gray-400'}`}>40/30/30 Plan</button>
              </div>
            </div>
            
            <div className="bg-[#050914] p-4 rounded-xl border border-gray-800">
              <label className="text-xs font-bold text-gray-400 block mb-2">Follow-Up Scheduler</label>
              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => setFollowUpSchedule(null)} className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${!currentClient.privateView.followUpSchedule ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-800/50 border-gray-800 text-gray-500'}`}>None</button>
                <button onClick={() => setFollowUpSchedule('3_days')} className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${currentClient.privateView.followUpSchedule === '3_days' ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'bg-gray-800/50 border-gray-800 text-gray-400'}`}>3 Days</button>
                <button onClick={() => setFollowUpSchedule('7_days')} className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${currentClient.privateView.followUpSchedule === '7_days' ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'bg-gray-800/50 border-gray-800 text-gray-400'}`}>7 Days</button>
                <button onClick={() => setFollowUpSchedule('14_days')} className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${currentClient.privateView.followUpSchedule === '14_days' ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'bg-gray-800/50 border-gray-800 text-gray-400'}`}>14 Days</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
