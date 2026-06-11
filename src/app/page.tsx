import Hero from '@/components/Hero';
import { Metadata } from 'next';
import Benefits from '@/components/Benefits';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import WebsiteVsNoWebsite from '@/components/WebsiteVsNoWebsite';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';

export const metadata: Metadata = {
  title: 'DevZilla | Premium Web Design & Development Agency',
  description: 'Scale your business with high-converting websites, powerful web apps, and AI-driven SEO strategies that turn clicks into revenue.',
  alternates: {
    canonical: '/',
  },
};

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