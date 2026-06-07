import Link from 'next/link';
import PortfolioGrid from '@/components/PortfolioGrid';

export default function PortfolioPage() {
  return (
    <main>
{/* Page Header */}
    <section className="pt-32 pb-16 bg-gradient-to-b from-[#020617] to-card border-b border-gray-800">
        <div className="container mx-auto px-6 lg:px-12 text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">Our <span className="text-gradient">Masterpieces</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Explore the premium websites we've crafted for restaurants and cafes across India. Every design is built for speed, beauty, and conversion.</p>
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