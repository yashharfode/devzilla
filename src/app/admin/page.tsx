'use client';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useRouter } from 'next/navigation';
import MasterCRM from '../../components/os/BackStage/MasterCRM';
import ShadowEditor from '../../components/os/BackStage/ShadowEditor';

import { useAgencyStore } from '../../store/useAgencyStore';
import { seedDatabase } from '../../config/seedFirebase';

export default function AdminDashboard() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const router = useRouter();
  const { initClient } = useAgencyStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  const handleNewBlueprint = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    initClient(newId);
    window.open(`/c/${newId}`, '_blank');
  };

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    const success = await seedDatabase();
    if (success) {
      alert("Database Seeded Successfully! Pricing logic is now pushed to Firebase.");
    } else {
      alert("Seeding failed. Check console.");
    }
    setIsSeeding(false);
  };

  if (!isAuthenticated) return <div className="min-h-screen bg-[#020510] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#1e293b] border-t-[#0d9488] rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-[#020510] font-sans selection:bg-primary/30 pb-20">
      <nav className="border-b border-gray-800 bg-[#060b1f]/90 backdrop-blur-md sticky top-0 z-50 py-4 shadow-xl">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold flex items-center gap-3 text-white">
            <div className="w-8 h-8 rounded bg-gradient-primary flex items-center justify-center text-dark shadow-[0_0_15px_rgba(244,185,66,0.5)]">
              <i className="fa-solid fa-bolt"></i>
            </div>
            DevZilla <span className="text-gray-500 font-normal">| Agency OS</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Back-Stage Access
            </span>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white transition text-sm">Logout</button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Command Center</h1>
            <p className="text-gray-400 text-sm">Manage pipelines, margins, and client blueprints securely.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow-lg transition-all flex items-center gap-2 border border-gray-700"
            >
              <i className={`fa-solid ${isSeeding ? 'fa-spinner fa-spin' : 'fa-database text-blue-400'}`}></i>
              {isSeeding ? 'Pushing Data...' : 'Seed Firebase'}
            </button>
            <button
              onClick={handleNewBlueprint}
              className="bg-primary hover:bg-primary-dark text-dark font-bold px-6 py-2.5 rounded-lg text-sm shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i> New Blueprint
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* We pass a callback so the table can tell us which client to edit */}
          <MasterCRM onSelectClient={setSelectedClientId} />

          {selectedClientId && (
            <div id="shadow-editor">
              <ShadowEditor key={selectedClientId} clientId={selectedClientId} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
