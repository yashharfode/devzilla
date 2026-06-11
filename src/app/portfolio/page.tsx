import Link from 'next/link';
import PortfolioGrid from '@/components/PortfolioGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Premium Portfolio | DevZilla Agency',
  description: 'Explore the stunning digital storefronts, websites, and web apps we have crafted for successful clients across various industries.',
  alternates: {
    canonical: '/portfolio',
  },
};

export default function PortfolioPage() {
  return (
    <main>
{/* Page Header */}
    <section className="pt-32 pb-16 bg-gradient-to-b from-[#020617] to-card border-b border-gray-800">
        <div className="container mx-auto px-6 lg:px-12 text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Premium <span className="text-gradient">Portfolio</span></h1>
          <p className="text-gray-400 text-lg">Explore some of the stunning digital storefronts we&apos;ve crafted for our successful clients.</p>
        </div>
    </section>

    {/* Portfolio Grid */}
    <section className="py-20 flex-grow">
        <div className="container mx-auto px-6 lg:px-12">
            <PortfolioGrid />
        </div>
    </section>

        </main>
  );
}