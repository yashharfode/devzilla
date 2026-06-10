'use client';

import { useEffect, useState, useRef } from 'react';
import { useAgencyStore } from '../../../store/useAgencyStore';
import { BasePackages, ModularAddons, BasePackageId, AddonId } from '../../../config/pricingDictionary';

const PREBUILT_CUSTOMS = [
  { name: 'Logo Design & Branding', price: 15000 },
  { name: 'Advanced SEO Setup', price: 12000 },
  { name: 'Copywriting (5 pages)', price: 8000 },
  { name: 'Payment Gateway Integration', price: 5000 },
];

export default function LiveQuotingEngine({ clientId }: { clientId: string }) {
  const { currentClient, initClient, setIndustry, setBasePackage, toggleAddon, toggleSubFeature, addCustomFeature, removeCustomFeature, updateCustomFeature, updateInfrastructure, addSpecialIncentive, removeSpecialIncentive } = useAgencyStore();

  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const packagesRef = useRef<HTMLDivElement>(null);

  const scrollPackages = (direction: 'left' | 'right') => {
    if (packagesRef.current) {
      const scrollAmount = 400;
      packagesRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

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
      {/* Deal Urgency Banner */}
      {publicView.urgencyBanner && (
        <div className="bg-red-500 text-white p-3 rounded-xl shadow-lg flex items-center justify-center gap-3 font-bold animate-pulse text-sm md:text-base border border-red-400">
          <i className="fa-solid fa-clock"></i>
          {publicView.urgencyBanner}
        </div>
      )}

      {/* Top Controls: Industry Selector */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-consultation-primary to-consultation-blue"></div>
        <h3 className="text-xl font-bold text-[#1e293b] mb-2 flex items-center gap-2">
          <i className="fa-solid fa-layer-group text-[#0d9488] text-2xl"></i> Client Industry
        </h3>
        <p className="text-[#64748b] text-sm mb-6 font-medium">Select the industry to auto-load the recommended blueprint configuration.</p>
        
        <div className="flex flex-wrap gap-3">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setIndustry(ind)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                industry === ind 
                  ? 'bg-[#f8fafc] border-[#0d9488] text-[#1e293b] shadow-inner' 
                  : 'bg-white border-gray-200 text-[#64748b] hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Base Packages */}
      <div>
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4 pr-0 md:pr-12">
          <h3 className="text-2xl font-bold text-[#1e293b] font-heading tracking-tight">
            <span className="text-[#0d9488] mr-3">1.</span> Base Infrastructure
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={() => scrollPackages('left')}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button 
              onClick={() => scrollPackages('right')}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div 
          ref={packagesRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {(Object.entries(BasePackages) as [BasePackageId, typeof BasePackages[BasePackageId]][])
            .filter(([id]) => {
              if (industry === 'Hospital') {
                return id.includes('clinic') || id.includes('hospital');
              }
              if (industry === 'Restaurant' || industry === 'Bhojnalaya') {
                return id.includes('bhojnalaya') || id.includes('restaurant');
              }
              // Default to General packages for 'General' or any other unmapped industry
              return id.includes('general');
            })
            .map(([id, pkg]) => {
            const isActive = publicView.basePackage === id;
            return (
              <div 
                key={id}
                className={`rounded-3xl p-6 md:p-8 transition-all border w-full md:w-[380px] shrink-0 snap-start flex-none ${
                  isActive 
                    ? 'bg-white border-[#0d9488] shadow-[0_15px_30px_-10px_rgba(186,242,233,0.3)]' 
                    : 'bg-[#f8fafc] border-gray-100 hover:border-gray-300 hover:bg-white'
                }`}
              >
                <div 
                  className="flex justify-between items-start mb-6 cursor-pointer"
                  onClick={() => setBasePackage(id)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${isActive ? 'border-[#0d9488]' : 'border-gray-300'}`}>
                    {isActive && <div className="w-3 h-3 rounded-full bg-[#0d9488]"></div>}
                  </div>
                  <div className="flex flex-col items-end text-right ml-4">
                    {pkg.compareAtPrice && <div className="text-xs font-mono text-gray-400 line-through mb-0.5">₹{pkg.compareAtPrice.toLocaleString('en-IN')}</div>}
                    <div className="text-2xl font-mono text-[#1e293b] font-bold tracking-tight">₹{pkg.price.toLocaleString('en-IN')}</div>
                  </div>
                </div>
                <div className="cursor-pointer" onClick={() => setBasePackage(id)}>
                  <h4 className="text-xl font-bold text-[#1e293b] mb-2">{pkg.name}</h4>
                  <p className="text-sm text-[#64748b] font-medium leading-relaxed">{pkg.description}</p>
                </div>

                <div className={`mt-8 pt-6 border-t border-gray-100 space-y-4 transition-opacity ${isActive ? 'opacity-100' : 'opacity-60 grayscale'}`}>
                  <h5 className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest mb-4">Included Core Features</h5>
                  {pkg.features.map(f => {
                    const isUnchecked = publicView.uncheckedSubFeatures.includes(f.id);
                    return (
                      <div key={f.id} className="flex items-start gap-3 group">
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleSubFeature(f.id); }}
                          className={`w-5 h-5 rounded flex-shrink-0 mt-0.5 flex items-center justify-center border transition-all shadow-sm ${
                            !isUnchecked ? 'bg-[#0d9488] border-[#0d9488] text-white' : 'bg-white border-gray-300 text-transparent hover:border-[#0d9488]/50'
                          }`}
                        >
                          <i className="fa-solid fa-check text-[10px]"></i>
                        </button>
                        <div className="cursor-pointer" onClick={() => toggleSubFeature(f.id)}>
                          <p className={`text-sm font-medium transition-colors ${!isUnchecked ? 'text-[#1e293b] group-hover:text-black' : 'text-gray-400 line-through'}`}>{f.name}</p>
                          {isUnchecked && <p className="text-xs text-red-500 mt-1 font-mono">-₹{f.deductionValue.toLocaleString('en-IN')} (Removed)</p>}
                        </div>
                      </div>
                    )
                  })}
                  
                  {pkg.freeServices && pkg.freeServices.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
                      <h5 className="text-[10px] text-[#0d9488] font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <i className="fa-solid fa-gift"></i> Free Bonuses
                      </h5>
                      <ul className="space-y-2">
                        {pkg.freeServices.map((fs, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs font-bold text-[#1e293b]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#f4b942]"></div> {fs}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modular Add-ons */}
      <div>
        <h3 className="text-2xl font-bold text-[#1e293b] mb-6 border-b border-gray-200 pb-4 inline-block pr-12 font-heading tracking-tight">
          <span className="text-[#0d9488] mr-3">2.</span> Modular Add-ons
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
                    ? 'bg-[#f8fafc] border-[#0d9488] shadow-sm' 
                    : 'bg-white border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-7 rounded-full p-1 transition-colors shadow-inner ${isSelected ? 'bg-[#0d9488]' : 'bg-gray-200'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform shadow-sm ${isSelected ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                  <div>
                    <h4 className={`font-bold ${isSelected ? 'text-[#1e293b]' : 'text-gray-600'}`}>{addon.name}</h4>
                    <p className="text-xs text-[#64748b] mt-1 font-medium">{addon.description}</p>
                  </div>
                </div>
                <div className="text-sm font-mono font-bold text-[#1e293b]">
                  +₹{addon.price.toLocaleString('en-IN')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Requirements */}
      <div>
        <h3 className="text-2xl font-bold text-[#1e293b] mb-6 border-b border-gray-200 pb-4 inline-block pr-12 font-heading tracking-tight">
          <span className="text-[#0d9488] mr-3">3.</span> Custom Requirements
        </h3>
        
        <div className="space-y-4 max-w-3xl">
          {/* Pre-built Suggestions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {PREBUILT_CUSTOMS.map((pc, idx) => (
              <button 
                key={idx}
                onClick={() => addCustomFeature(pc.name, pc.price)}
                className="bg-white border border-gray-200 hover:border-[#0d9488] hover:bg-[#f8fafc] text-[#64748b] hover:text-[#0d9488] px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <i className="fa-solid fa-plus"></i> {pc.name} (₹{pc.price.toLocaleString('en-IN')})
              </button>
            ))}
          </div>

          {publicView.customFeatures.map(cf => (
            <div key={cf.id} className="flex flex-col md:flex-row items-center gap-3 bg-white border border-[#0d9488]/50 p-2 pl-4 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-[#0d9488]/20 transition-all">
              <div className="flex items-center gap-3 flex-grow w-full">
                <div className="w-5 h-5 rounded-full bg-[#0d9488] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                  <i className="fa-solid fa-check text-[10px]"></i>
                </div>
                <input 
                  type="text" 
                  value={cf.name}
                  onChange={(e) => updateCustomFeature(cf.id, e.target.value, cf.price)}
                  className="bg-transparent border-none text-[#1e293b] font-bold text-sm focus:outline-none w-full"
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-2 md:pt-0 pl-0 md:pl-4">
                <span className="text-[#64748b] font-mono font-bold">₹</span>
                <input 
                  type="number" 
                  value={cf.price}
                  onChange={(e) => updateCustomFeature(cf.id, cf.name, Number(e.target.value))}
                  className="bg-transparent border-none text-[#1e293b] font-mono font-bold w-24 focus:outline-none"
                />
                <button onClick={() => removeCustomFeature(cf.id)} className="text-gray-400 hover:text-red-500 transition w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 flex-shrink-0">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row gap-3 bg-white border border-gray-200 p-3 rounded-2xl focus-within:border-[#0d9488] focus-within:ring-2 focus-within:ring-[#0d9488]/20 transition-all shadow-sm mt-4">
            <input 
              type="text" 
              placeholder="Describe custom requirement..." 
              className="bg-transparent border-none text-[#1e293b] flex-grow focus:outline-none text-sm px-4 py-3"
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
            />
            <div className="flex items-center gap-2 md:border-l border-gray-200 pl-4 pr-2">
              <span className="text-[#64748b] font-mono font-bold">₹</span>
              <input 
                type="number" 
                placeholder="0" 
                className="bg-transparent border-none text-[#1e293b] w-28 focus:outline-none text-sm font-mono font-bold"
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

      {/* Competitor Comparison Matrix */}
      {publicView.showCompetitorMatrix && (
        <div>
          <h3 className="text-2xl font-bold text-[#1e293b] mb-6 border-b border-gray-200 pb-4 inline-block pr-12 font-heading tracking-tight">
            <span className="text-[#0d9488] mr-3">⭐</span> Why DevZilla?
          </h3>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8fafc] text-[#64748b] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-bold">Feature</th>
                  <th className="px-6 py-4 font-bold text-center bg-[#0d9488]/5 text-[#0d9488]">DevZilla</th>
                  <th className="px-6 py-4 font-bold text-center">Freelancers / Generic Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 font-medium text-[#1e293b]">Turnaround Time</td>
                  <td className="px-6 py-4 text-center font-bold text-[#0d9488] bg-[#0d9488]/5">5-10 Days</td>
                  <td className="px-6 py-4 text-center text-gray-500">3-6 Weeks</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-[#1e293b]">Hidden Costs</td>
                  <td className="px-6 py-4 text-center font-bold text-[#0d9488] bg-[#0d9488]/5">Zero. 100% Transparent.</td>
                  <td className="px-6 py-4 text-center text-gray-500">High (Plugins, Maintenance)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-[#1e293b]">Conversion Focused</td>
                  <td className="px-6 py-4 text-center font-bold text-[#0d9488] bg-[#0d9488]/5">Built-in Sales Funnels</td>
                  <td className="px-6 py-4 text-center text-gray-500">Just a Brochure</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-[#1e293b]">Post-Launch Support</td>
                  <td className="px-6 py-4 text-center font-bold text-[#0d9488] bg-[#0d9488]/5">Dedicated WhatsApp Channel</td>
                  <td className="px-6 py-4 text-center text-gray-500">Email only / No Response</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Infrastructure */}
      <div>
        <h3 className="text-2xl font-bold text-[#1e293b] mb-6 border-b border-gray-200 pb-4 inline-block pr-12 font-heading tracking-tight">
          <span className="text-[#0d9488] mr-3">4.</span> Infrastructure (Domain & Hosting)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Hosting Toggle */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-[#1e293b] mb-4 text-sm uppercase tracking-wider">Web Hosting</h4>
            <div className="flex gap-2">
              <button 
                onClick={() => updateInfrastructure({ hostingProvider: 'devzilla' })}
                className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                  publicView.infrastructure.hostingProvider === 'devzilla'
                    ? 'bg-[#f8fafc] border-[#0d9488] text-[#1e293b] shadow-inner'
                    : 'bg-white border-gray-200 text-[#64748b] hover:bg-gray-50'
                }`}
              >
                DevZilla Cloud<br/>
                <span className="text-[10px] md:text-xs font-mono font-normal mt-1 block">₹3,000/yr</span>
              </button>
              <button 
                onClick={() => updateInfrastructure({ hostingProvider: 'client' })}
                className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                  publicView.infrastructure.hostingProvider === 'client'
                    ? 'bg-[#f8fafc] border-[#0d9488] text-[#1e293b] shadow-inner'
                    : 'bg-white border-gray-200 text-[#64748b] hover:bg-gray-50'
                }`}
              >
                Client Provided<br/>
                <span className="text-[10px] md:text-xs font-mono font-normal mt-1 block">₹0/yr</span>
              </button>
              <button 
                onClick={() => updateInfrastructure({ hostingProvider: 'assisted' })}
                className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                  publicView.infrastructure.hostingProvider === 'assisted'
                    ? 'bg-[#f8fafc] border-[#0d9488] text-[#1e293b] shadow-inner'
                    : 'bg-white border-gray-200 text-[#64748b] hover:bg-gray-50'
                }`}
              >
                Assisted Setup<br/>
                <span className="text-[10px] md:text-xs font-mono font-normal mt-1 block">Custom/yr</span>
              </button>
            </div>
            
            {publicView.infrastructure.hostingProvider === 'assisted' && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-[#64748b]">Enter Hosting Price/Yr</span>
                <div className="flex items-center gap-2 bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-1.5 w-1/2">
                  <span className="text-[#64748b] font-mono font-bold text-sm">₹</span>
                  <input 
                    type="number"
                    value={publicView.infrastructure.hostingYearlyCost || ''}
                    onChange={(e) => updateInfrastructure({ hostingYearlyCost: Number(e.target.value) })}
                    className="bg-transparent border-none w-full focus:outline-none text-sm font-mono font-bold text-[#1e293b]"
                    placeholder="e.g. 2500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Domain Toggle */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-[#1e293b] mb-4 text-sm uppercase tracking-wider">Domain Name (.com / .in)</h4>
            <div className="flex gap-2">
              <button 
                onClick={() => updateInfrastructure({ domainStatus: 'new' })}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border ${
                  publicView.infrastructure.domainStatus === 'new'
                    ? 'bg-[#f8fafc] border-[#0d9488] text-[#1e293b] shadow-inner'
                    : 'bg-white border-gray-200 text-[#64748b] hover:bg-gray-50'
                }`}
              >
                Buy New<br/>
                <span className="text-xs font-mono font-normal mt-1 block">Custom/yr</span>
              </button>
              <button 
                onClick={() => updateInfrastructure({ domainStatus: 'owned' })}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border ${
                  publicView.infrastructure.domainStatus === 'owned'
                    ? 'bg-[#f8fafc] border-[#0d9488] text-[#1e293b] shadow-inner'
                    : 'bg-white border-gray-200 text-[#64748b] hover:bg-gray-50'
                }`}
              >
                Already Owned<br/>
                <span className="text-xs font-mono font-normal mt-1 block">₹0/yr</span>
              </button>
            </div>

            {publicView.infrastructure.domainStatus === 'new' && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-[#64748b]">1st Year Price</span>
                  <div className="flex items-center gap-2 bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-1.5 w-1/2">
                    <span className="text-[#64748b] font-mono font-bold text-sm">₹</span>
                    <input 
                      type="number"
                      value={publicView.infrastructure.domainFirstYearCost || ''}
                      onChange={(e) => updateInfrastructure({ domainFirstYearCost: Number(e.target.value) })}
                      className="bg-transparent border-none w-full focus:outline-none text-sm font-mono font-bold text-[#1e293b]"
                      placeholder="e.g. 500"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-[#64748b]">Renewal Price/Yr</span>
                  <div className="flex items-center gap-2 bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-1.5 w-1/2">
                    <span className="text-[#64748b] font-mono font-bold text-sm">₹</span>
                    <input 
                      type="number"
                      value={publicView.infrastructure.domainRenewalCost || ''}
                      onChange={(e) => updateInfrastructure({ domainRenewalCost: Number(e.target.value) })}
                      className="bg-transparent border-none w-full focus:outline-none text-sm font-mono font-bold text-[#1e293b]"
                      placeholder="e.g. 1000"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Duration Slider */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-[#1e293b] text-sm uppercase tracking-wider">Contract Duration</h4>
              <span className="font-mono font-bold text-[#0d9488] bg-[#0d9488]/10 px-3 py-1 rounded-full text-sm">
                {publicView.infrastructure.durationYears} Year{publicView.infrastructure.durationYears > 1 ? 's' : ''}
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="5" 
              step="1"
              value={publicView.infrastructure.durationYears}
              onChange={(e) => updateInfrastructure({ durationYears: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0d9488]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-bold px-1">
              <span>1 Yr</span>
              <span>2 Yrs</span>
              <span>3 Yrs</span>
              <span>4 Yrs</span>
              <span>5 Yrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Special Incentives */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-[#1e293b] mb-6 border-b border-gray-200 pb-4 inline-block pr-12 font-heading tracking-tight">
          <span className="text-[#0d9488] mr-3">5.</span> Consultation Bonuses
        </h3>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm max-w-4xl">
          <p className="text-sm text-[#64748b] mb-6">
            Apply special value-add incentives for the client taking immediate action. These will be deducted from the Initial Investment total.
          </p>

          <div className="space-y-4">
            {publicView.specialIncentives.map((incentive) => (
              <div key={incentive.id} className="flex items-center justify-between bg-[#f8fafc] border border-gray-200 p-4 rounded-xl">
                <div>
                  <h4 className="font-bold text-[#1e293b] text-sm">{incentive.reason}</h4>
                  <p className="text-xs text-[#0d9488] font-bold font-mono">-₹{incentive.amount.toLocaleString('en-IN')}</p>
                </div>
                <button 
                  onClick={() => removeSpecialIncentive(incentive.id)}
                  className="text-red-500 hover:text-red-700 transition-colors p-2"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
            
            <form 
              className="flex gap-4 items-end pt-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const reasonInput = form.elements.namedItem('reason') as HTMLInputElement;
                const amountInput = form.elements.namedItem('amount') as HTMLInputElement;
                
                if (reasonInput.value && amountInput.value) {
                  addSpecialIncentive(Number(amountInput.value), reasonInput.value);
                  form.reset();
                }
              }}
            >
              <div className="flex-1">
                <label className="block text-xs font-bold text-[#64748b] mb-1">Incentive Description</label>
                <input 
                  name="reason"
                  type="text" 
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0d9488]"
                  placeholder="e.g. Free Logo Design Promo"
                  required
                />
              </div>
              <div className="w-1/3">
                <label className="block text-xs font-bold text-[#64748b] mb-1">Value (₹)</label>
                <input 
                  name="amount"
                  type="number" 
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0d9488] font-mono"
                  placeholder="e.g. 5000"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-[#1e293b] hover:bg-[#334155] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors h-[38px] flex items-center justify-center"
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
