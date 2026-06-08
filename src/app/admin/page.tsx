import MasterCRM from '../../components/os/BackStage/MasterCRM';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#020510] font-sans selection:bg-primary/30">
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
            <Link href="/" className="text-gray-400 hover:text-white transition text-sm">Exit</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Command Center</h1>
            <p className="text-gray-400 text-sm">Manage pipelines, margins, and client blueprints securely.</p>
          </div>
          <button className="bg-primary hover:bg-primary-dark text-dark font-bold px-6 py-2.5 rounded-lg text-sm shadow-lg transition-transform hover:scale-105 flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> New Blueprint
          </button>
        </div>

        <div className="space-y-8">
          {/* Master CRM Table */}
          <MasterCRM />
          
          {/* We will add Shadow Editor integration later */}
        </div>
      </main>
    </div>
  );
}
