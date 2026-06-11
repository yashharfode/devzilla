import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';

const Benefits = dynamic(() => import('@/components/Benefits'));
const PortfolioShowcase = dynamic(() => import('@/components/PortfolioShowcase'), { ssr: false });
const WebsiteVsNoWebsite = dynamic(() => import('@/components/WebsiteVsNoWebsite'));
const Pricing = dynamic(() => import('@/components/Pricing'));
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: false });
const FinalCTA = dynamic(() => import('@/components/FinalCTA'));

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