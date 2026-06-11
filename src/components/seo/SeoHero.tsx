import Link from 'next/link';

export default function SeoHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div data-aos="fade-up" className="order-2 lg:order-1 lg:pr-10">
            <div className="inline-block bg-[#0d9488]/10 border border-[#0d9488]/30 rounded-full px-5 py-2 mb-8 shadow-[0_0_15px_rgba(13,148,136,0.2)]">
              <span className="text-[#0d9488] font-bold text-sm tracking-wide">🚀 AI-POWERED SEARCH DOMINANCE</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-heading">
              Rank #1 on <span className="text-gradient">Google</span> & AI Engines
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
              We don't just do traditional SEO. We optimize your brand for Google, ChatGPT, Gemini, and Voice Search. Future-proof your business with our holistic AEO + GEO + SEO strategies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-12">
              <Link href="https://wa.me/919244161034" className="premium-btn px-8 py-4 rounded-xl text-center font-bold text-lg flex items-center justify-center gap-2">
                Get a Free Audit <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link href="#pricing" className="glass-panel text-white font-bold px-8 py-4 rounded-xl text-center hover:bg-white/10 transition-colors border border-gray-700">
                View Pricing
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-400">
              <div className="flex items-center gap-2"><i className="fa-solid fa-chart-line text-[#0d9488] text-lg"></i> Data-Driven Strategy</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-robot text-[#0d9488] text-lg"></i> AI-Optimized Content</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-ranking-star text-[#0d9488] text-lg"></i> Guaranteed Visibility</div>
            </div>
          </div>
          
          <div data-aos="fade-left" data-aos-delay="200" className="relative order-1 lg:order-2 mt-10 lg:mt-0 flex justify-center perspective-1000">
            {/* Abstract SEO Graphic representation */}
            <div className="relative w-full max-w-lg aspect-square group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0d9488]/30 to-blue-600/30 rounded-full blur-[80px] animate-pulse-slow"></div>
              
              {/* Main Center Card */}
              <div className="absolute inset-0 m-auto w-3/4 h-3/4 glass-card rounded-3xl border border-white/10 flex flex-col items-center justify-center p-8 shadow-2xl transition-transform duration-500 group-hover:scale-105 z-20 overflow-hidden bg-gradient-to-b from-[#0c1432]/90 to-[#060b1f]/90">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#0d9488] to-transparent"></div>
                
                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(13,148,136,0.2)]">
                  <i className="fa-brands fa-google text-5xl text-white"></i>
                </div>
                
                <div className="text-4xl font-bold text-white mb-2 font-heading tracking-tight">Position #1</div>
                <div className="text-[#0d9488] font-bold tracking-widest uppercase text-xs mb-6 px-4 py-1 bg-[#0d9488]/10 rounded-full">Organic Search</div>
                
                {/* Fake Search Bar */}
                <div className="w-full bg-black/40 rounded-full h-10 border border-white/5 flex items-center px-4 overflow-hidden relative">
                   <i className="fa-solid fa-magnifying-glass text-gray-500 text-sm"></i>
                   <div className="h-4 w-1/2 bg-gray-600/50 rounded ml-3 animate-pulse"></div>
                   <div className="absolute right-1 top-1 bottom-1 w-8 bg-[#0d9488] rounded-full flex items-center justify-center">
                     <i className="fa-solid fa-arrow-right text-dark text-xs"></i>
                   </div>
                </div>
              </div>
              
              {/* Decorative Background Card 1 */}
              <div className="absolute top-4 left-4 w-3/4 h-3/4 glass-panel rounded-3xl border border-white/5 transform -rotate-6 transition-transform duration-500 group-hover:-rotate-12 group-hover:-translate-x-4 group-hover:-translate-y-2 z-10 opacity-60"></div>
              
              {/* Decorative Background Card 2 */}
              <div className="absolute bottom-4 right-4 w-3/4 h-3/4 glass-panel rounded-3xl border border-white/5 transform rotate-6 transition-transform duration-500 group-hover:rotate-12 group-hover:translate-x-4 group-hover:translate-y-2 z-10 opacity-60"></div>
              
              {/* Floating Stat Cards */}
              <div className="absolute top-1/4 -right-6 md:-right-12 glass-panel px-5 py-4 rounded-xl flex items-center gap-4 z-30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] border border-white/10 backdrop-blur-xl" style={{ animation: 'float 5s ease-in-out infinite' }}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-lg">
                  <i className="fa-solid fa-arrow-trend-up text-xl"></i>
                </div>
                <div>
                   <div className="text-white font-bold text-lg leading-none">+340%</div>
                   <div className="text-gray-400 text-xs mt-1 font-medium uppercase tracking-wider">Organic Traffic</div>
                </div>
              </div>
              
              <div className="absolute bottom-1/4 -left-6 md:-left-12 glass-panel px-5 py-4 rounded-xl flex items-center gap-4 z-30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] border border-white/10 backdrop-blur-xl" style={{ animation: 'float 6s ease-in-out infinite 1s' }}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                  <i className="fa-solid fa-bullseye text-xl"></i>
                </div>
                <div>
                   <div className="text-white font-bold text-lg leading-none">10x ROI</div>
                   <div className="text-gray-400 text-xs mt-1 font-medium uppercase tracking-wider">High-Intent Leads</div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
