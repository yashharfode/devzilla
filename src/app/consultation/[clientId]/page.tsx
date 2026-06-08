import LiveQuotingEngine from '../../../components/os/FrontStage/LiveQuotingEngine';
import ConsultationFooter from '../../../components/os/FrontStage/ConsultationFooter';

export default async function ConsultationPage({ params }: { params: Promise<{ clientId: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="min-h-screen bg-[#020510] font-sans selection:bg-primary/30 relative">
      <nav className="border-b border-gray-800 bg-[#060b1f]/90 backdrop-blur-md sticky top-0 z-50 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold flex items-center gap-2 text-white">
            <i className="fa-solid fa-code text-primary"></i> DevZilla <span className="text-gray-500 font-normal hidden md:inline">| Blueprint Architect</span>
          </div>
          <div className="text-xs md:text-sm font-mono text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
            ID: {resolvedParams.clientId}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-12 text-center max-w-3xl mx-auto" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Digital Solution <span className="text-primary">Blueprint</span></h1>
          <p className="text-gray-400 text-lg">Let&apos;s craft the perfect digital infrastructure for your business. Select your required features below to see live transparent pricing.</p>
        </div>

        <LiveQuotingEngine clientId={resolvedParams.clientId} />
      </main>

      <ConsultationFooter />
    </div>
  );
}
