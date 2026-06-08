'use client';
import { useState, useEffect } from 'react';
import { useAgencyStore } from '../../../store/useAgencyStore';

export default function ShadowEditor({ clientId }: { clientId: string }) {
  const { currentClient, selectClient, addDiscount, updateInternalNotes } = useAgencyStore();
  
  const [discountAmt, setDiscountAmt] = useState('');
  const [discountReason, setDiscountReason] = useState('');
  const [notes, setNotes] = useState(currentClient?.privateView.internalNotes || '');

  if (!currentClient || currentClient.id !== clientId) {
    // This will trigger a re-render from the store if it's missing, but we handle selection manually usually
    selectClient(clientId);
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

          <div className="space-y-4">
            <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest border-b border-gray-800 pb-2">Discount Ledger (Hidden from Client)</h4>
            
            {currentClient.privateView.discounts.length === 0 ? (
              <p className="text-xs text-gray-600 italic py-2">No active discounts.</p>
            ) : (
              <ul className="space-y-2 mb-4 max-h-[150px] overflow-y-auto custom-scrollbar">
                {currentClient.privateView.discounts.map(d => (
                  <li key={d.id} className="text-sm flex justify-between bg-red-500/5 border border-red-500/20 px-4 py-2.5 rounded-lg">
                    <span className="text-gray-300">{d.reason}</span>
                    <span className="font-mono text-red-400 font-bold">-₹{d.amount.toLocaleString('en-IN')}</span>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="flex gap-2 mt-2">
              <input 
                type="number" 
                placeholder="Amount (₹)" 
                className="bg-[#050914] border border-gray-800 rounded-lg p-2.5 text-sm text-white w-1/3 focus:border-red-500/50 outline-none transition-colors font-mono"
                value={discountAmt}
                onChange={e => setDiscountAmt(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Reason (e.g. Closing Deal)" 
                className="bg-[#050914] border border-gray-800 rounded-lg p-2.5 text-sm text-white w-2/3 focus:border-red-500/50 outline-none transition-colors"
                value={discountReason}
                onChange={e => setDiscountReason(e.target.value)}
              />
            </div>
            <button 
              onClick={handleAddDiscount}
              className="w-full bg-red-500/10 text-red-400 border border-red-500/30 font-bold py-2.5 rounded-lg text-sm hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-tag"></i> Apply Secret Discount
            </button>
          </div>
        </div>

        {/* Right Column: Internal Notes */}
        <div className="flex flex-col">
          <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Private Intel & Strategy</h4>
          <textarea 
            className="w-full flex-grow bg-[#050914] border border-gray-800 rounded-xl p-4 text-gray-300 text-sm focus:outline-none focus:border-primary/50 resize-none custom-scrollbar"
            placeholder="Log client budget constraints, strict requirements, or automated follow-up strategies here..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          ></textarea>
          
          <div className="flex gap-4 mt-4">
            <button 
              onClick={handleSaveNotes}
              className="flex-grow bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition text-sm flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-floppy-disk"></i> Save Notes
            </button>
            <button className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 font-bold py-3 px-6 rounded-lg transition text-sm flex items-center justify-center gap-2">
               Clone Config <i className="fa-solid fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
