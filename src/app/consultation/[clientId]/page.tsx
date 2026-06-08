import LiveQuotingEngine from '../../../components/os/FrontStage/LiveQuotingEngine';
import ConsultationFooter from '../../../components/os/FrontStage/ConsultationFooter';

export default async function ConsultationPage({ params }: { params: Promise<{ clientId: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="min-h-screen bg-[var(--color-consultation-bg)] font-sans selection:bg-[var(--color-consultation-primary)]/30 relative text-[var(--color-consultation-text)]">
      <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold flex items-center gap-2 text-[var(--color-consultation-text)]">
            <i className="fa-solid fa-code text-[var(--color-consultation-primary)] text-2xl drop-shadow-sm"></i> DevZilla <span className="text-[var(--color-consultation-text-muted)] font-normal hidden md:inline">| Blueprint Architect</span>
          </div>
          <div className="text-xs md:text-sm font-mono text-[var(--color-consultation-text-muted)] bg-[var(--color-consultation-bg)] px-4 py-1.5 rounded-full border border-gray-200 shadow-inner">
            ID: {resolvedParams.clientId}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-12 text-center max-w-3xl mx-auto" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-[var(--color-consultation-text)] tracking-tight">
            Digital Solution Blueprint
          </h1>
          <p className="text-[var(--color-consultation-text-muted)] text-lg">
            Let&apos;s craft the perfect digital infrastructure for your business. Select your required features below to see live transparent pricing.
          </p>
        </div>

        <LiveQuotingEngine clientId={resolvedParams.clientId} />
      </main>

      <ConsultationFooter />
    </div>
  );
}
