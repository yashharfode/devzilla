'use client';
import { useState } from 'react';
import { useAgencyStore } from '../../../store/useAgencyStore';

const DISCOUNT_REASONS = [
  "Strategic Partner Bonus",
  "Founder's Incentive",
  "Priority Onboarding Bonus",
  "Industry Launch Incentive",
  "Referral Partner Bonus",
  "Combo Service Advantage",
  "Repeat Client Loyalty",
  "Early Settlement Bonus",
  "Digital India Initiative",
  "Local Business Support"
];

// DevZilla Rulebook: Hard caps per tier
const MAX_FIXED_DISCOUNT: Record<string, number> = {
  'basic_package': 2000,
  'standard_package': 3000,
  'premium_package': 5000,
};

export default function DiscountEngine({ clientId }: { clientId: string }) {
  const { currentClient, addDiscount } = useAgencyStore();
  const [discountType, setDiscountType] = useState<'fixed' | 'percent'>('fixed');
  const [discountValue, setDiscountValue] = useState('');
  const [discountReason, setDiscountReason] = useState(DISCOUNT_REASONS[0]);
  const [errorMsg, setErrorMsg] = useState('');

  if (!currentClient || currentClient.id !== clientId) return null;

  const baseCost = currentClient.privateView.baseCost;
  const currentDiscountsTotal = currentClient.privateView.discounts.reduce((sum, d) => sum + d.amount, 0);

  const handleApplyDiscount = () => {
    setErrorMsg('');
    const val = Number(discountValue);
    
    if (!val || val <= 0) {
      setErrorMsg("Invalid discount value.");
      return;
    }

    let computedAmount = val;

    // PERCENTAGE LOGIC
    if (discountType === 'percent') {
      if (val > 20) {
        setErrorMsg("Rulebook Violation: Cannot exceed 20% absolute cap.");
        return;
      }
      computedAmount = Math.round(baseCost * (val / 100));
    } 
    
    // FIXED LOGIC & FINAL TIER CAP CHECK
    const packageKey = currentClient.publicView.basePackage;
    const maxAllowed = MAX_FIXED_DISCOUNT[packageKey] || 0;

    if (computedAmount + currentDiscountsTotal > maxAllowed) {
      setErrorMsg(`Rulebook Violation: Total discounts cannot exceed ₹${maxAllowed.toLocaleString('en-IN')} for this tier.`);
      return;
    }

    // Apply it
    addDiscount(computedAmount, discountReason);
    setDiscountValue('');
  };

  const getZoneColor = () => {
    if (discountType === 'fixed') return 'border-gray-700 text-white';
    const val = Number(discountValue);
    if (!val) return 'border-gray-700 text-white';
    if (val <= 10) return 'border-green-500/50 text-green-400'; // Green Zone
    if (val <= 15) return 'border-yellow-500/50 text-yellow-400'; // Yellow Zone
    return 'border-red-500/50 text-red-400'; // Red Zone (Approval required, but we allow up to 20%)
  };

  return (
    <div className="bg-[#050914] p-5 rounded-xl border border-gray-800 shadow-inner">
      <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
        <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
          <i className="fa-solid fa-gavel"></i> Master Discount Engine
        </h4>
        <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">Strict Caps Active</span>
      </div>

      {currentClient.privateView.discounts.length > 0 && (
        <ul className="space-y-2 mb-4 max-h-[150px] overflow-y-auto custom-scrollbar">
          {currentClient.privateView.discounts.map(d => (
            <li key={d.id} className="text-sm flex justify-between bg-emerald-500/5 border border-emerald-500/20 px-4 py-2.5 rounded-lg">
              <span className="text-gray-300">{d.reason}</span>
              <span className="font-mono text-emerald-400 font-bold">-₹{d.amount.toLocaleString('en-IN')}</span>
            </li>
          ))}
        </ul>
      )}

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-2 rounded text-xs mb-3 flex items-center gap-2">
          <i className="fa-solid fa-ban"></i> {errorMsg}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex gap-2">
          <select 
            value={discountType}
            onChange={(e) => { setDiscountType(e.target.value as any); setDiscountValue(''); }}
            className="bg-[#0a1128] border border-gray-700 rounded-lg p-2.5 text-sm text-gray-300 w-1/3 focus:outline-none"
          >
            <option value="fixed">Fixed (₹)</option>
            <option value="percent">Percent (%)</option>
          </select>
          
          <input 
            type="number" 
            placeholder={discountType === 'percent' ? "e.g. 10" : "e.g. 2000"} 
            className={`bg-[#0a1128] border rounded-lg p-2.5 text-sm w-2/3 focus:outline-none transition-colors font-mono ${getZoneColor()}`}
            value={discountValue}
            onChange={e => setDiscountValue(e.target.value)}
          />
        </div>

        <select 
          value={discountReason}
          onChange={e => setDiscountReason(e.target.value)}
          className="w-full bg-[#0a1128] border border-gray-700 rounded-lg p-2.5 text-sm text-gray-300 focus:outline-none"
        >
          {DISCOUNT_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <button 
          onClick={handleApplyDiscount}
          className="w-full bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold py-2.5 rounded-lg text-sm hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-bolt"></i> Push Incentive to Front-Stage
        </button>
      </div>
    </div>
  );
}
