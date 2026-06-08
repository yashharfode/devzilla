import ConsultationTabs from '../../../components/os/FrontStage/ConsultationTabs';

export default async function ConsultationPage({ params }: { params: Promise<{ clientId: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-[#0d9488]/30 relative text-[#1e293b]">
      <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold flex items-center gap-2 text-[#1e293b]">
            <i className="fa-solid fa-code text-[#0d9488] text-2xl drop-shadow-sm"></i> DevZilla <span className="text-[#64748b] font-normal hidden md:inline">| Blueprint Architect</span>
          </div>
          <div className="text-xs md:text-sm font-mono text-[#64748b] bg-[#f8fafc] px-4 py-1.5 rounded-full border border-gray-200 shadow-inner">
            ID: {resolvedParams.clientId}
          </div>
        </div>
      </nav>

      <main>
        <ConsultationTabs clientId={resolvedParams.clientId} />
      </main>
    </div>
  );
}
