'use client';

import { useEffect, useState } from 'react';
import { useAgencyStore } from '../../../store/useAgencyStore';
import { BasePackages, ModularAddons, BasePackageId, AddonId } from '../../../config/pricingDictionary';

export default function LiveQuotingEngine({ clientId }: { clientId: string }) {
  const { currentClient, initClient, setIndustry, setBasePackage, toggleAddon, toggleSubFeature, addCustomFeature, removeCustomFeature } = useAgencyStore();

  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');

  useEffect(() => {
    if (!currentClient || currentClient.id !== clientId) {
      initClient(clientId);
    }
  }, [clientId, initClient, currentClient]);

  if (!currentClient) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-gray-400 animate-pulse font-mono tracking-widest uppercase">Initializing Blueprint Engine...</div>
      </div>
    );
  }

  const { industry, publicView } = currentClient;
  const industries = ['General', 'Restaurant', 'Hospital', 'Real Estate', 'Gym', 'E-Commerce'];

  const handleAddCustom = () => {
    if (customName.trim() && customPrice) {
      addCustomFeature(customName, Number(customPrice));
      setCustomName('');
      setCustomPrice('');
    }
  };

  return (
    <div className="w-full space-y-12 pb-32" id="blueprint-content">
      {/* Top Controls: Industry Selector */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-consultation-primary)] to-[var(--color-consultation-blue)]"></div>
        <h3 className="text-xl font-bold text-[var(--color-consultation-text)] mb-2 flex items-center gap-2">
          <i className="fa-solid fa-layer-group text-[var(--color-consultation-primary)] text-2xl"></i> Client Industry
        </h3>
        <p className="text-[var(--color-consultation-text-muted)] text-sm mb-6 font-medium">Select the industry to auto-load the recommended blueprint configuration.</p>
        
        <div className="flex flex-wrap gap-3">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setIndustry(ind)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                industry === ind 
                  ? 'bg-[var(--color-consultation-bg)] border-[var(--color-consultation-primary)] text-[var(--color-consultation-text)] shadow-inner' 
                  : 'bg-white border-gray-200 text-[var(--color-consultation-text-muted)] hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Base Packages */}
      <div>
        <h3 className="text-2xl font-bold text-[var(--color-consultation-text)] mb-6 border-b border-gray-200 pb-4 inline-block pr-12 font-heading tracking-tight">
          <span className="text-[var(--color-consultation-primary)] mr-3">1.</span> Base Infrastructure
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.entries(BasePackages) as [BasePackageId, typeof BasePackages[BasePackageId]][]).map(([id, pkg]) => {
            const isActive = publicView.basePackage === id;
            return (
              <div 
                key={id}
                className={`rounded-3xl p-6 md:p-8 transition-all border ${
                  isActive 
                    ? 'bg-white border-[var(--color-consultation-primary)] shadow-[0_15px_30px_-10px_rgba(186,242,233,0.3)]' 
                    : 'bg-[var(--color-consultation-bg)] border-gray-100 hover:border-gray-300 hover:bg-white'
                }`}
              >
                <div 
                  className="flex justify-between items-start mb-6 cursor-pointer"
                  onClick={() => setBasePackage(id)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${isActive ? 'border-[var(--color-consultation-primary)]' : 'border-gray-300'}`}>
                    {isActive && <div className="w-3 h-3 rounded-full bg-[var(--color-consultation-primary)]"></div>}
                  </div>
                  <div className="text-2xl font-mono text-[var(--color-consultation-text)] font-bold ml-4 tracking-tight">₹{pkg.price.toLocaleString('en-IN')}</div>
                </div>
                <div className="cursor-pointer" onClick={() => setBasePackage(id)}>
                  <h4 className="text-xl font-bold text-[var(--color-consultation-text)] mb-2">{pkg.name}</h4>
                  <p className="text-sm text-[var(--color-consultation-text-muted)] font-medium leading-relaxed">{pkg.description}</p>
                </div>

                {isActive && (
                  <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                    <h5 className="text-[10px] text-[var(--color-consultation-text-muted)] font-bold uppercase tracking-widest mb-4">Included Core Features</h5>
                    {pkg.features.map(f => {
                      const isUnchecked = publicView.uncheckedSubFeatures.includes(f.id);
                      return (
                        <div key={f.id} className="flex items-start gap-3 group">
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleSubFeature(f.id); }}
                            className={`w-5 h-5 rounded flex-shrink-0 mt-0.5 flex items-center justify-center border transition-all shadow-sm ${
                              !isUnchecked ? 'bg-[var(--color-consultation-primary)] border-[var(--color-consultation-primary)] text-white' : 'bg-white border-gray-300 text-transparent hover:border-[var(--color-consultation-primary)]/50'
                            }`}
                          >
                            <i className="fa-solid fa-check text-[10px]"></i>
                          </button>
                          <div className="cursor-pointer" onClick={() => toggleSubFeature(f.id)}>
                            <p className={`text-sm font-medium transition-colors ${!isUnchecked ? 'text-[var(--color-consultation-text)] group-hover:text-black' : 'text-gray-400 line-through'}`}>{f.name}</p>
                            {isUnchecked && <p className="text-xs text-red-500 mt-1 font-mono">-₹{f.deductionValue.toLocaleString('en-IN')} (Removed)</p>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modular Add-ons */}
      <div>
        <h3 className="text-2xl font-bold text-[var(--color-consultation-text)] mb-6 border-b border-gray-200 pb-4 inline-block pr-12 font-heading tracking-tight">
          <span className="text-[var(--color-consultation-primary)] mr-3">2.</span> Modular Add-ons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.entries(ModularAddons) as [AddonId, typeof ModularAddons[AddonId]][]).map(([id, addon]) => {
            const isSelected = publicView.selectedAddons.includes(id);
            return (
              <div 
                key={id}
                onClick={() => toggleAddon(id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all flex items-center justify-between border ${
                  isSelected 
                    ? 'bg-[var(--color-consultation-bg)] border-[var(--color-consultation-primary)] shadow-sm' 
                    : 'bg-white border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-7 rounded-full p-1 transition-colors shadow-inner ${isSelected ? 'bg-[var(--color-consultation-primary)]' : 'bg-gray-200'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform shadow-sm ${isSelected ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                  <div>
                    <h4 className={`font-bold ${isSelected ? 'text-[var(--color-consultation-text)]' : 'text-gray-600'}`}>{addon.name}</h4>
                    <p className="text-xs text-[var(--color-consultation-text-muted)] mt-1 font-medium">{addon.description}</p>
                  </div>
                </div>
                <div className="text-sm font-mono font-bold text-[var(--color-consultation-text)]">
                  +₹{addon.price.toLocaleString('en-IN')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Requirements */}
      <div>
        <h3 className="text-2xl font-bold text-[var(--color-consultation-text)] mb-6 border-b border-gray-200 pb-4 inline-block pr-12 font-heading tracking-tight">
          <span className="text-[var(--color-consultation-primary)] mr-3">3.</span> Custom Requirements
        </h3>
        
        <div className="space-y-3 max-w-3xl">
          {publicView.customFeatures.map(cf => (
            <div key={cf.id} className="flex items-center justify-between bg-white border border-[var(--color-consultation-primary)]/50 p-5 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-[var(--color-consultation-primary)] flex items-center justify-center text-white shadow-sm">
                  <i className="fa-solid fa-check text-xs"></i>
                </div>
                <span className="font-bold text-[var(--color-consultation-text)] text-sm">{cf.name}</span>
              </div>
              <div className="flex items-center gap-5">
                <span className="font-mono text-[var(--color-consultation-text)] font-bold">+₹{cf.price.toLocaleString('en-IN')}</span>
                <button onClick={() => removeCustomFeature(cf.id)} className="text-gray-400 hover:text-red-500 transition w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row gap-3 bg-white border border-gray-200 p-3 rounded-2xl focus-within:border-[var(--color-consultation-primary)] focus-within:ring-2 focus-within:ring-[var(--color-consultation-primary)]/20 transition-all shadow-sm">
            <input 
              type="text" 
              placeholder="Describe custom requirement..." 
              className="bg-transparent border-none text-[var(--color-consultation-text)] flex-grow focus:outline-none text-sm px-4 py-3"
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
            />
            <div className="flex items-center gap-2 md:border-l border-gray-200 pl-4 pr-2">
              <span className="text-[var(--color-consultation-text-muted)] font-mono font-bold">₹</span>
              <input 
                type="number" 
                placeholder="0" 
                className="bg-transparent border-none text-[var(--color-consultation-text)] w-28 focus:outline-none text-sm font-mono font-bold"
                value={customPrice}
                onChange={e => setCustomPrice(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
              />
            </div>
            <button 
              onClick={handleAddCustom}
              className="premium-btn px-8 py-3 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
