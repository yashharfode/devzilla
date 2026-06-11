import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';

import { Metadata } from 'next';

const Benefits = dynamic(() => import('@/components/Benefits'));
const PortfolioShowcase = dynamic(() => import('@/components/PortfolioShowcase'));
const WebsiteVsNoWebsite = dynamic(() => import('@/components/WebsiteVsNoWebsite'));
const Pricing = dynamic(() => import('@/components/Pricing'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const FinalCTA = dynamic(() => import('@/components/FinalCTA'));

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