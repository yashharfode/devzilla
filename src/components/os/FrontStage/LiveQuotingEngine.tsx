'use client';

import { useEffect } from 'react';
import { useAgencyStore } from '../../../store/useAgencyStore';
import { BasePackages, ModularAddons, BasePackageId, AddonId } from '../../../config/pricingDictionary';

export default function LiveQuotingEngine({ clientId }: { clientId: string }) {
  const { currentClient, initClient, setIndustry, setBasePackage, toggleAddon } = useAgencyStore();

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
          {(Object.entries(BasePackages) as [BasePackageId, typeof BasePackages[BasePackageId]][]).map(([id, pkg]) => (
            <div 
              key={id}
              onClick={() => setBasePackage(id)}
              className={`cursor-pointer rounded-2xl p-6 transition-all border ${
                publicView.basePackage === id 
                  ? 'bg-[#0a1128] border-primary shadow-[0_0_20px_rgba(244,185,66,0.1)]' 
                  : 'glass-card border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${publicView.basePackage === id ? 'border-primary' : 'border-gray-700'}`}>
                  {publicView.basePackage === id && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                </div>
                <div className="text-xl font-mono text-white font-bold">₹{pkg.price.toLocaleString('en-IN')}</div>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{pkg.name}</h4>
              <p className="text-sm text-gray-400">{pkg.description}</p>
            </div>
          ))}
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
    </div>
  );
}
