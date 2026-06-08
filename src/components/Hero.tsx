import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div data-aos="fade-up" className="order-2 lg:order-1">
            <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <span className="text-primary font-medium text-sm">🔥 #1 Choice For Restaurants & Cafes</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Get More Customers For Your <span className="text-gradient">Restaurant</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
              Professional Website + WhatsApp Integration + Google Maps + Online Menu. We build digital storefronts that help customers find, trust, and contact you instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="https://wa.me/919244161034" className="bg-gradient-primary text-dark font-bold px-8 py-4 rounded-xl text-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(244,185,66,0.4)]">
                Get Free Consultation
              </Link>
              <Link href="/portfolio" className="glass-panel text-white font-bold px-8 py-4 rounded-xl text-center hover:bg-white/10 transition-colors">
                View Live Demo
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-400">
              <div className="flex items-center gap-2"><i className="fa-solid fa-check-circle text-primary"></i> Mobile Friendly</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-check-circle text-primary"></i> SEO Ready</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-check-circle text-primary"></i> WhatsApp Integrated</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-check-circle text-primary"></i> Fast Loading</div>
            </div>
          </div>
          
          <div data-aos="fade-left" data-aos-delay="200" className="relative order-1 lg:order-2 mt-10 lg:mt-0">
            <div className="relative z-10 w-full aspect-video glass-card rounded-2xl border-2 border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden group">
               <img src="/assets/Works/Restaurants/Restaurant-1.png" alt="Restaurant Website Mockup" className="w-full h-full object-cover object-top group-hover:object-bottom transition-all duration-[5000ms] ease-linear" />
               <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6">
                 <div className="glass-panel rounded-xl p-4 flex justify-between items-center shadow-2xl border border-white/10">
                    <div>
                      <div className="text-white font-bold">Royal Tadka Website</div>
                      <div className="text-green-400 text-sm flex items-center gap-2 mt-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Live Order Received
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                      <i className="fa-brands fa-whatsapp text-2xl"></i>
                    </div>
                 </div>
               </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-8 -right-4 md:-right-8 glass-panel px-6 py-4 rounded-xl flex items-center gap-4 z-30 shadow-xl" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                <i className="fa-solid fa-star text-xl"></i>
              </div>
              <div>
                 <div className="text-white font-bold text-sm">Google Reviews</div>
                 <div className="text-yellow-500 font-bold text-xs">★★★★★ 4.9</div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -left-4 md:-left-10 glass-panel px-6 py-4 rounded-xl flex items-center gap-4 z-30 shadow-xl" style={{ animation: 'float 7s ease-in-out infinite 1s' }}>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                <i className="fa-solid fa-location-dot text-xl"></i>
              </div>
              <div>
                 <div className="text-white font-bold text-sm">Google Maps</div>
                 <div className="text-gray-400 text-xs">Easy Navigation</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
