import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import WebsiteVsNoWebsite from '@/components/WebsiteVsNoWebsite';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  return (
    <main className="bg-dark min-h-screen">
      <Hero />
      <Benefits />
      <PortfolioShowcase />
      <WebsiteVsNoWebsite />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}