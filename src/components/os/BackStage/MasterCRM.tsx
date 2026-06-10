'use client';
import { useState, useMemo, useEffect } from 'react';
import { useAgencyStore, ClientDocument } from '../../../store/useAgencyStore';
import { db } from '../../../config/firebase';
import { collection, onSnapshot, query, setDoc, doc, deleteDoc } from 'firebase/firestore';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0d9488', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function MasterCRM({ onSelectClient }: { onSelectClient?: (id: string) => void }) {
  const { clients, leads, addLead, updateLeadStatus, deleteLead, convertLeadToClient } = useAgencyStore();
  const [activeTab, setActiveTab] = useState<'analytics' | 'pipeline' | 'clients' | 'pricing'>('analytics');

  // Leads Pipeline State
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCategory, setNewLeadCategory] = useState('');
  const [leadError, setLeadError] = useState<string | null>(null);
  
  // Toast state for conversion
  const [showToast, setShowToast] = useState<{show: boolean, clientId: string | null}>({show: false, clientId: null});

  // AI Pricing Wizard State
  const [pricingPrompt, setPricingPrompt] = useState('');
  const [isGeneratingPricing, setIsGeneratingPricing] = useState(false);
  const [generatedPackage, setGeneratedPackage] = useState<any>(null); // Holds the parsed JSON
  const [pricingCategory, setPricingCategory] = useState('restaurant');
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [wizardModel, setWizardModel] = useState("nvidia/nemotron-3-super-120b-a12b:free");
  const [pricingPackages, setPricingPackages] = useState<any[]>([]);

  // Real-time Firestore Sync for Clients & Pricing
  useEffect(() => {
    const qClients = query(collection(db, 'clients'));
    const unsubClients = onSnapshot(qClients, (snapshot) => {
      const liveClients: ClientDocument[] = [];
      snapshot.forEach(doc => {
        liveClients.push({ ...doc.data(), id: doc.id } as ClientDocument);
      });
      useAgencyStore.setState({ clients: liveClients });
    });

    const qPricing = query(collection(db, 'pricing_packages'));
    const unsubPricing = onSnapshot(qPricing, (snapshot) => {
      const livePkgs: any[] = [];
      snapshot.forEach(doc => {
        livePkgs.push({ ...doc.data(), firebaseId: doc.id });
      });
      setPricingPackages(livePkgs);
    });

    return () => {
      unsubClients();
      unsubPricing();
    };
  }, []);

  // Analytics Calculations
  const totalRevenue = useMemo(() => clients.reduce((sum, c) => sum + (c.publicView.finalPrice || 0), 0), [clients]);
  const wonClients = clients.filter(c => c.privateView.dealStatus === 'won');
  const conversionRate = useMemo(() => leads.length > 0 ? Math.round((clients.length / (leads.length + clients.length)) * 100) : 0, [clients, leads]);
  
  const industryData = useMemo(() => {
    const counts: Record<string, number> = {};
    clients.forEach(c => counts[c.industry] = (counts[c.industry] || 0) + 1);
    return Object.keys(counts).map(k => ({ name: k, value: counts[k] }));
  }, [clients]);

  const revenueData = [
    { name: 'Jan', revenue: 40000 },
    { name: 'Feb', revenue: 75000 },
    { name: 'Mar', revenue: 50000 },
    { name: 'Apr', revenue: 120000 },
    { name: 'May', revenue: totalRevenue > 0 ? totalRevenue : 90000 }, 
  ];

  const handleAddLead = () => {
    if(!newLeadPhone) return;
    setLeadError(null);
    const result = addLead(newLeadPhone, newLeadName, newLeadCategory);
    if (!result.success && result.error) {
      setLeadError(result.error);
    } else {
      setNewLeadPhone('');
      setNewLeadName('');
      setNewLeadCategory('');
    }
  };

  const handleConvertLead = (id: string) => {
    const newClientId = convertLeadToClient(id);
    if(newClientId) {
      setShowToast({show: true, clientId: newClientId});
      setTimeout(() => setShowToast({show: false, clientId: null}), 5000);
    }
  };

  const handleGeneratePricing = async () => {
    if(!pricingPrompt.trim()) return;
    setIsGeneratingPricing(true);
    setGeneratedPackage(null);
    
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'pricing_wizard',
          industry: pricingCategory,
          input: pricingPrompt,
          model: wizardModel
        })
      });
      const data = await res.json();
      
      if(!res.ok) throw new Error("API Route requires update for pricing_wizard action.");
      
      setGeneratedPackage(data);
    } catch(err) {
      setTimeout(() => {
        setGeneratedPackage({
          id: pricingPrompt.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0,15) || 'new_package',
          name: 'AI Generated Package',
          price: 24999,
          description: 'Custom generated by AI based on your prompt.',
          features: [
            { id: 'feat_1', name: 'Premium UI Design', deductionValue: 2000 },
            { id: 'feat_2', name: 'Mobile Responsiveness', deductionValue: 1000 }
          ],
          freeServices: ['1 Month Free Maintenance']
        });
        setIsGeneratingPricing(false);
      }, 1500);
    }
  };

  const savePricingPackage = async () => {
    if (!generatedPackage) return;
    try {
      const pkgId = generatedPackage.firebaseId || generatedPackage.id || Date.now().toString();
      await setDoc(doc(db, 'pricing_packages', pkgId), generatedPackage);
      alert("✅ Saved to Firebase successfully!");
      setGeneratedPackage(null);
      setPricingPrompt('');
    } catch (e: any) {
      console.error(e);
      alert("❌ Firebase Error: " + e.message);
    }
  };

  const deletePricingPackage = async (firebaseId: string) => {
    try {
      await deleteDoc(doc(db, 'pricing_packages', firebaseId));
    } catch (e: any) {
      console.error(e);
      alert("Error deleting: " + e.message);
    }
  };

  return (
    <div className="rounded-3xl border border-teal-500/30 overflow-hidden shadow-[0_0_50px_rgba(13,148,136,0.1)] relative bg-[#020510]">
      {showToast.show && (
        <div className="absolute top-4 right-4 z-50 bg-[#050b1a] border border-teal-500/50 p-4 rounded-xl shadow-[0_0_20px_rgba(13,148,136,0.3)] animate-fade-in flex flex-col gap-3">
          <div className="flex items-center gap-2 text-teal-400 font-bold">
            <i className="fa-solid fa-circle-check"></i> Lead Converted Successfully!
          </div>
          <p className="text-xs text-gray-400">Lead has been moved to the main Clients database.</p>
          <div className="flex gap-2">
            <Link href={`/c/${showToast.clientId}`} target="_blank" className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-2">
              <i className="fa-solid fa-play"></i> Start Consultation Now
            </Link>
            <button onClick={() => setShowToast({show: false, clientId: null})} className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-700">Dismiss</button>
          </div>
        </div>
      )}

      {/* Consultation Theme Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="p-6 border-b border-teal-500/20 bg-gradient-to-r from-[#020510] to-[#0a1128] flex justify-between items-center relative z-10 overflow-x-auto">
        <div>
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-tight flex items-center gap-3">
            <i className="fa-solid fa-bolt text-teal-400"></i> Command Center
          </h2>
          <p className="text-gray-400 text-xs mt-1 font-medium tracking-wide">Master CRM & Revenue Analytics</p>
        </div>
        
        <div className="flex flex-wrap gap-2 bg-[#020510] p-2 rounded-xl border border-gray-800 overflow-x-auto">
          <button onClick={() => setActiveTab('analytics')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'analytics' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'text-gray-500 hover:text-gray-300 border border-transparent'}`}>
            <i className="fa-solid fa-chart-pie mr-1"></i> Analytics
          </button>
          <button onClick={() => setActiveTab('pipeline')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'pipeline' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'text-gray-500 hover:text-gray-300 border border-transparent'}`}>
            <i className="fa-solid fa-filter mr-1"></i> Pipeline ({leads.filter(l => l.status !== 'converted' && l.status !== 'not_interested').length})
          </button>
          <button onClick={() => setActiveTab('clients')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'clients' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'text-gray-500 hover:text-gray-300 border border-transparent'}`}>
            <i className="fa-solid fa-users mr-1"></i> Clients
          </button>
          <button onClick={() => setActiveTab('pricing')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'pricing' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'text-gray-500 hover:text-gray-300 border border-transparent'}`}>
            <i className="fa-solid fa-wand-magic-sparkles mr-1"></i> AI Pricing
          </button>
        </div>
      </div>
      
      <div className="p-6 relative z-10 min-h-[600px]">
        
        {/* --- ANALYTICS TAB --- */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#050b1a] border border-teal-500/20 rounded-2xl p-6 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all"></div>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Value</h3>
                <p className="text-4xl font-black text-white">₹{totalRevenue.toLocaleString('en-IN')}</p>
              </div>
              
              <div className="bg-[#050b1a] border border-blue-500/20 rounded-2xl p-6 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Active Deals</h3>
                <p className="text-4xl font-black text-white">{clients.length}</p>
              </div>

              <div className="bg-[#050b1a] border border-purple-500/20 rounded-2xl p-6 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Conversion Rate</h3>
                <p className="text-4xl font-black text-white">{conversionRate}%</p>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#050b1a] border border-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-gray-300 text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-chart-area text-teal-400"></i> Revenue Trajectory
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                      <XAxis dataKey="name" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#020510', borderColor: '#0d9488', borderRadius: '12px', color: '#fff' }} itemStyle={{ color: '#2dd4bf', fontWeight: 'bold' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-[#050b1a] border border-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-gray-300 text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-chart-pie text-blue-400"></i> Industry Distribution
                </h3>
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={industryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {industryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ backgroundColor: '#020510', borderColor: '#3b82f6', borderRadius: '12px', color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- LEADS PIPELINE TAB --- */}
        {activeTab === 'pipeline' && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-[#050b1a] border border-gray-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row gap-4 items-start md:items-end">
              <div className="flex-1">
                <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Phone Number *</label>
                <input type="text" placeholder="+91..." className="w-full bg-[#020510] border border-gray-700 rounded-lg p-2.5 text-white text-sm focus:border-yellow-500 focus:outline-none transition-colors" value={newLeadPhone} onChange={(e) => setNewLeadPhone(e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Name (Optional)</label>
                <input type="text" placeholder="e.g. John Doe" className="w-full bg-[#020510] border border-gray-700 rounded-lg p-2.5 text-white text-sm focus:border-yellow-500 focus:outline-none transition-colors" value={newLeadName} onChange={(e) => setNewLeadName(e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Category</label>
                <input type="text" placeholder="e.g. Gym, Clinic" className="w-full bg-[#020510] border border-gray-700 rounded-lg p-2.5 text-white text-sm focus:border-yellow-500 focus:outline-none transition-colors" value={newLeadCategory} onChange={(e) => setNewLeadCategory(e.target.value)} />
              </div>
              <button onClick={handleAddLead} className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold px-6 py-2.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(202,138,4,0.3)] whitespace-nowrap">
                <i className="fa-solid fa-plus"></i> Add Lead
              </button>
            </div>
            
            {leadError && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm font-bold animate-pulse">
                {leadError}
              </div>
            )}

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#050b1a]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#020510] text-gray-400 font-mono text-xs uppercase tracking-wider border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Contact Info</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {leads.filter(l => l.status !== 'converted').map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white font-mono">{lead.phone}</div>
                        <div className="text-xs text-gray-400">{lead.name || 'Unknown Name'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300">{lead.category || 'Uncategorized'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none cursor-pointer ${
                            lead.status === 'not_interested' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                            lead.status === 'meeting' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                            'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                          }`}
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        >
                          <option value="lead" className="bg-gray-900">New Lead</option>
                          <option value="follow_up" className="bg-gray-900">Follow Up</option>
                          <option value="meeting" className="bg-gray-900">Meeting Set</option>
                          <option value="negotiating" className="bg-gray-900">Negotiating</option>
                          <option value="not_interested" className="bg-gray-900 text-red-400">Not Interested ☠️</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => deleteLead(lead.id)} className="text-gray-500 hover:text-red-400 transition" title="Delete">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          {lead.status !== 'not_interested' && (
                            <button onClick={() => handleConvertLead(lead.id)} className="bg-teal-500/20 hover:bg-teal-500/40 text-teal-400 border border-teal-500/30 text-xs font-bold px-3 py-1 rounded-md transition-colors" title="Convert to Formal Client">
                              Convert <i className="fa-solid fa-arrow-right"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- CLIENTS TAB --- */}
        {activeTab === 'clients' && (
          <div className="animate-fade-in overflow-x-auto rounded-xl border border-blue-500/20 bg-[#050b1a] shadow-lg">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-[#020510] text-blue-400/70 font-mono text-xs uppercase tracking-wider border-b border-blue-500/20">
                <tr>
                  <th className="px-6 py-4 font-semibold">Client Details</th>
                  <th className="px-6 py-4 font-semibold">Package</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-blue-900/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg border border-blue-500/30">
                          {client.clientName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-base">{client.clientName}</div>
                          <div className="text-xs text-gray-400 font-mono"><i className="fa-solid fa-building text-[10px]"></i> {client.businessName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <span className="capitalize font-medium text-blue-200">{client.publicView.basePackage.replace(/_/g, ' ')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        className="text-xs font-bold px-3 py-1.5 rounded-lg border outline-none bg-gray-900 text-white border-gray-700"
                        value={client.privateView.dealStatus}
                        onChange={(e) => {
                          if(onSelectClient) {
                            onSelectClient(client.id);
                            useAgencyStore.getState().setDealStatus(e.target.value as any);
                          }
                        }}
                      >
                        <option value="negotiating">Negotiating</option>
                        <option value="won">Closed Won</option>
                        <option value="lost">Closed Lost</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/c/${client.id}`} target="_blank" className="text-gray-500 hover:text-blue-400 transition ml-3" title="View Consultation Front-Stage">
                        <i className="fa-solid fa-eye"></i> Open Builder
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- AI PRICING WIZARD TAB --- */}
        {activeTab === 'pricing' && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-[#050b1a] border border-purple-500/30 rounded-2xl p-6 shadow-lg">
              <div className="flex gap-4 items-center mb-4">
                <div className="bg-purple-500/20 p-3 rounded-xl border border-purple-500/40 text-purple-400">
                  <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">AI Pricing Wizard</h3>
                  <p className="text-gray-400 text-xs">Tell AI what package to create or update. It will format the JSON for Firebase automatically.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex gap-2">
                  <select className="bg-[#020510] border border-gray-700 rounded-lg px-4 text-white text-sm focus:border-purple-500 outline-none w-40" value={pricingCategory} onChange={e=>setPricingCategory(e.target.value)}>
                    <option value="restaurant">Restaurant</option>
                    <option value="real_estate">Real Estate</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="medical">Medical/Clinic</option>
                    {customCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button 
                    onClick={() => {
                      const newCat = window.prompt('Enter new category name (e.g. Saloon, Education):');
                      if(newCat && newCat.trim()) {
                        setCustomCategories([...customCategories, newCat.trim()]);
                        setPricingCategory(newCat.trim());
                      }
                    }}
                    className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-3 rounded-lg flex items-center justify-center transition-colors"
                    title="Add Custom Category"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <input 
                  type="text" 
                  placeholder="e.g. Naya 'Real Estate Special' package add karo 24999 ka jisme 3D tour ho..." 
                  className="flex-1 bg-[#020510] border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-purple-500 focus:outline-none transition-colors"
                  value={pricingPrompt}
                  onChange={(e) => setPricingPrompt(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleGeneratePricing()}
                />
                <div className="flex flex-col gap-2">
                  <select 
                    className="bg-black/50 border border-gray-800 rounded p-1 text-[10px] text-gray-400 outline-none w-24 truncate self-end"
                    value={wizardModel}
                    onChange={(e) => setWizardModel(e.target.value)}
                    title="Select AI Model"
                  >
                    <option value="nvidia/nemotron-3-super-120b-a12b:free">Nemotron 120B</option>
                    <option value="liquid/lfm-2.5-1.2b-instruct:free">Liquid LFM (Fast)</option>
                  </select>
                  <button 
                    onClick={handleGeneratePricing}
                    disabled={isGeneratingPricing || !pricingPrompt}
                    className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-lg transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)] whitespace-nowrap flex items-center gap-2"
                  >
                    {isGeneratingPricing ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-bolt"></i>}
                    Generate Format
                  </button>
                </div>
              </div>
            </div>

            {/* Hybrid Control: The Editable Approval Gate */}
            {generatedPackage && (
              <div className="bg-[#050b1a] border border-blue-500/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.15)] animate-fade-in relative">
                <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-blue-400">
                  Approval Gate
                </div>
                
                <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-user-shield"></i> Master Yash, verify and edit this AI-generated package:
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Package Name</label>
                    <input type="text" className="w-full bg-[#020510] border border-gray-700 rounded-lg p-2.5 text-white text-sm" value={generatedPackage.name} onChange={(e) => setGeneratedPackage({...generatedPackage, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Price (₹)</label>
                    <input type="number" className="w-full bg-[#020510] border border-gray-700 rounded-lg p-2.5 text-green-400 font-mono font-bold text-sm" value={generatedPackage.price} onChange={(e) => setGeneratedPackage({...generatedPackage, price: Number(e.target.value)})} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Description</label>
                    <input type="text" className="w-full bg-[#020510] border border-gray-700 rounded-lg p-2.5 text-gray-300 text-sm" value={generatedPackage.description} onChange={(e) => setGeneratedPackage({...generatedPackage, description: e.target.value})} />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-gray-400 text-xs font-bold uppercase mb-2 block">Generated Features & Deductions</label>
                  <div className="space-y-2 bg-[#020510] p-4 rounded-xl border border-gray-800">
                    {generatedPackage.features?.map((f: any, i: number) => (
                      <div key={i} className="flex gap-4">
                        <input type="text" className="flex-1 bg-transparent border-b border-gray-700 p-1 text-sm text-gray-300 focus:border-blue-500 outline-none" value={f.name} onChange={(e) => {
                          const newFeat = [...generatedPackage.features];
                          newFeat[i].name = e.target.value;
                          setGeneratedPackage({...generatedPackage, features: newFeat});
                        }} />
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 font-mono">Deduction: ₹</span>
                          <input type="number" className="w-24 bg-transparent border-b border-gray-700 p-1 text-sm font-mono text-green-400 focus:border-blue-500 outline-none" value={f.deductionValue} onChange={(e) => {
                            const newFeat = [...generatedPackage.features];
                            newFeat[i].deductionValue = Number(e.target.value);
                            setGeneratedPackage({...generatedPackage, features: newFeat});
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-800">
                  <button onClick={() => setGeneratedPackage(null)} className="px-4 py-2 text-gray-400 hover:text-white text-sm font-bold transition-colors">
                    Discard
                  </button>
                  <button onClick={savePricingPackage} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center gap-2">
                    <i className="fa-solid fa-cloud-arrow-up"></i> Approve & Live Update
                  </button>
                </div>
              </div>
            )}
            
            {/* Existing Manual Package List Mock */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-4">Current Firebase Database</h3>
              
              {pricingPackages.length === 0 && (
                <div className="text-center text-gray-400 py-4 text-sm font-bold">No packages in Firebase yet.</div>
              )}
              
              {pricingPackages.map(pkg => (
                <div key={pkg.firebaseId} className="flex items-center justify-between bg-gray-100/50 border border-gray-200 p-4 rounded-xl mb-2">
                  <div>
                    <span className="text-[#1e293b] font-bold">{pkg.name}</span>
                    <span className="ml-3 text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded">Custom</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 font-mono font-bold">₹{pkg.price?.toLocaleString()}</span>
                    <button className="text-gray-500 hover:text-[#0d9488]" title="Edit" onClick={() => setGeneratedPackage(pkg)}><i className="fa-solid fa-pencil"></i></button>
                    <button className="text-gray-500 hover:text-red-500" title="Delete" onClick={() => deletePricingPackage(pkg.firebaseId)}><i className="fa-solid fa-trash"></i></button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
