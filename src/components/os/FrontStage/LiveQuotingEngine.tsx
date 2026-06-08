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
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-gray-800 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <i className="fa-solid fa-layer-group text-primary"></i> Client Industry
        </h3>
        <p className="text-gray-400 text-sm mb-6">Select the industry to auto-load the recommended blueprint configuration.</p>
        
        <div className="flex flex-wrap gap-3">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setIndustry(ind)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                industry === ind 
                  ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(244,185,66,0.15)]' 
                  : 'bg-dark border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Base Packages */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4 inline-block pr-12">
          <span className="text-primary mr-3">1.</span> Base Infrastructure
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.entries(BasePackages) as [BasePackageId, typeof BasePackages[BasePackageId]][]).map(([id, pkg]) => {
            const isActive = publicView.basePackage === id;
            return (
              <div 
                key={id}
                className={`rounded-2xl p-6 transition-all border ${
                  isActive 
                    ? 'bg-[#0a1128] border-primary shadow-[0_0_20px_rgba(244,185,66,0.1)]' 
                    : 'glass-card border-gray-800 hover:border-gray-700 opacity-70 hover:opacity-100'
                }`}
              >
                <div 
                  className="flex justify-between items-start mb-4 cursor-pointer"
                  onClick={() => setBasePackage(id)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${isActive ? 'border-primary' : 'border-gray-700'}`}>
                    {isActive && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                  </div>
                  <div className="text-xl font-mono text-white font-bold ml-4">₹{pkg.price.toLocaleString('en-IN')}</div>
                </div>
                <div className="cursor-pointer" onClick={() => setBasePackage(id)}>
                  <h4 className="text-lg font-bold text-white mb-2">{pkg.name}</h4>
                  <p className="text-sm text-gray-400">{pkg.description}</p>
                </div>

                {isActive && (
                  <div className="mt-6 pt-4 border-t border-gray-800/50 space-y-3">
                    <h5 className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3">Included Core Features</h5>
                    {pkg.features.map(f => {
                      const isUnchecked = publicView.uncheckedSubFeatures.includes(f.id);
                      return (
                        <div key={f.id} className="flex items-start gap-3 group">
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleSubFeature(f.id); }}
                            className={`w-5 h-5 rounded flex-shrink-0 mt-0.5 flex items-center justify-center border transition-colors ${
                              !isUnchecked ? 'bg-primary border-primary text-dark' : 'bg-transparent border-gray-600 text-transparent hover:border-primary/50'
                            }`}
                          >
                            <i className="fa-solid fa-check text-xs"></i>
                          </button>
                          <div className="cursor-pointer" onClick={() => toggleSubFeature(f.id)}>
                            <p className={`text-sm transition-colors ${!isUnchecked ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 line-through'}`}>{f.name}</p>
                            {isUnchecked && <p className="text-xs text-red-400/80 mt-0.5">-₹{f.deductionValue.toLocaleString('en-IN')} (Removed)</p>}
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
        <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4 inline-block pr-12">
          <span className="text-primary mr-3">2.</span> Modular Add-ons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.entries(ModularAddons) as [AddonId, typeof ModularAddons[AddonId]][]).map(([id, addon]) => {
            const isSelected = publicView.selectedAddons.includes(id);
            return (
              <div 
                key={id}
                onClick={() => toggleAddon(id)}
                className={`cursor-pointer rounded-xl p-5 transition-all flex items-center justify-between border ${
                  isSelected 
                    ? 'bg-primary/5 border-primary/50' 
                    : 'glass-card border-gray-800 hover:bg-gray-800/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${isSelected ? 'bg-primary' : 'bg-gray-700'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isSelected ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                  <div>
                    <h4 className={`font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>{addon.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{addon.description}</p>
                  </div>
                </div>
                <div className="text-sm font-mono font-bold text-gray-300">
                  +₹{addon.price.toLocaleString('en-IN')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Requirements */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4 inline-block pr-12">
          <span className="text-primary mr-3">3.</span> Custom Requirements
        </h3>
        
        <div className="space-y-3 max-w-3xl">
          {publicView.customFeatures.map(cf => (
            <div key={cf.id} className="flex items-center justify-between glass-card border border-primary/30 bg-primary/5 p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-dark border border-primary">
                  <i className="fa-solid fa-check text-xs"></i>
                </div>
                <span className="font-bold text-white text-sm">{cf.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-primary font-bold">+₹{cf.price.toLocaleString('en-IN')}</span>
                <button onClick={() => removeCustomFeature(cf.id)} className="text-gray-500 hover:text-red-400 transition w-6 h-6 flex items-center justify-center">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row gap-3 glass-card border border-gray-800 p-2 rounded-xl focus-within:border-gray-600 transition-colors">
            <input 
              type="text" 
              placeholder="Describe custom requirement..." 
              className="bg-transparent border-none text-white flex-grow focus:outline-none text-sm px-4 py-2"
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
            />
            <div className="flex items-center gap-2 md:border-l border-gray-800 pl-4 pr-2">
              <span className="text-gray-500 font-mono">₹</span>
              <input 
                type="number" 
                placeholder="0" 
                className="bg-transparent border-none text-white w-24 focus:outline-none text-sm font-mono"
                value={customPrice}
                onChange={e => setCustomPrice(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
              />
            </div>
            <button 
              onClick={handleAddCustom}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
