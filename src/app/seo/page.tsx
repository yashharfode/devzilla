import FinalCTA from '@/components/FinalCTA';
import SeoHero from '@/components/seo/SeoHero';
import SeoPricing from '@/components/seo/SeoPricing';

export const metadata = {
  title: 'SEO Services | DevZilla Agency',
  description: 'AI-Powered SEO, AEO & GEO Solutions to dominate Google, ChatGPT, and Gemini search results.',
};

export default function SeoPage() {
  return (
    <main className="bg-dark min-h-screen">
      
      {/* SEO Components */}
      <SeoHero />
      
      <div className="py-20 relative overflow-hidden bg-gradient-to-b from-dark to-[#060b1f] border-y border-gray-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 data-aos="fade-up" className="text-3xl md:text-5xl font-bold mb-6 font-heading tracking-tight">Why Traditional SEO is <span className="text-red-500">Dead</span></h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-gray-400 max-w-3xl mx-auto mb-12 text-lg">
            People aren't just searching on Google anymore. They are asking ChatGPT, using Voice Search, and interacting with AI Overviews. Our holistic Search Growth Programs ensure you are visible everywhere your customers are looking.
          </p>
          <div className="flex flex-wrap justify-center gap-6" data-aos="fade-up" data-aos-delay="200">
             <div className="glass-panel px-8 py-4 rounded-xl border-t border-[#0d9488]/30 shadow-lg hover:-translate-y-1 transition-transform">
               <strong className="text-xl text-white block mb-1">SEO</strong> 
               <span className="text-gray-400 text-sm">Search Engine Optimization</span>
             </div>
             <div className="glass-panel px-8 py-4 rounded-xl border-t border-purple-500/30 shadow-lg hover:-translate-y-1 transition-transform">
               <strong className="text-xl text-white block mb-1">AEO</strong> 
               <span className="text-gray-400 text-sm">Answer Engine Optimization</span>
             </div>
             <div className="glass-panel px-8 py-4 rounded-xl border-t border-blue-500/30 shadow-lg hover:-translate-y-1 transition-transform">
               <strong className="text-xl text-white block mb-1">GEO</strong> 
               <span className="text-gray-400 text-sm">Generative Engine Optimization</span>
             </div>
          </div>
        </div>
      </div>

      <SeoPricing />
      
      <FinalCTA />
    </main>
  );
}
