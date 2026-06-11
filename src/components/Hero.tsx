'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const industries = [
  { name: 'Business', image: '/assets/Works/Others/image copy 8.png', color: 'from-blue-500 to-cyan-400', icon: 'fa-briefcase' },
  { name: 'Restaurant', image: '/assets/Works/Restaurants/Restaurant-1.png', color: 'from-orange-500 to-yellow-400', icon: 'fa-utensils' },
  { name: 'Hospital', image: '/assets/Works/Hospitals/hospital.png', color: 'from-emerald-400 to-teal-500', icon: 'fa-user-doctor' },
  { name: 'Gym & Fitness', image: '/assets/Works/Gym Fitness Coach/image copy 7.png', color: 'from-red-500 to-rose-400', icon: 'fa-dumbbell' },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Advanced Mesh Gradient Background */}
      <div className="absolute inset-0 bg-dark z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#0d9488]/20 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" style={{ animation: 'float 8s infinite' }}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div data-aos="fade-up" className="order-2 lg:order-1 relative z-20">
            <div className="inline-flex items-center gap-2 bg-[#0d9488]/10 border border-[#0d9488]/30 rounded-full px-5 py-2.5 mb-8 shadow-[0_0_20px_rgba(13,148,136,0.15)] backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d9488] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0d9488]"></span>
              </span>
              <span className="text-[#0d9488] font-bold text-xs uppercase tracking-widest">Premium Digital Agency</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black leading-[1.1] mb-6 font-heading tracking-tight text-white">
              We Build <br/>
              <div className="relative inline-block overflow-hidden h-[1.2em] w-full mt-2">
                {industries.map((industry, idx) => (
                  <span 
                    key={industry.name}
                    className={`absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r ${industry.color} transition-all duration-700 ease-in-out ${
                      idx === currentIndex ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'
                    }`}
                  >
                    {industry.name}
                  </span>
                ))}
              </div>
              <span className="block text-4xl md:text-5xl lg:text-6xl mt-2 text-gray-400 font-bold">That Dominate.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-light">
              Transform your business with high-converting websites, powerful web apps, and AI-driven SEO strategies that turn clicks into revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-12">
              <Link href="https://wa.me/919244161034" className="group relative overflow-hidden bg-gradient-primary text-dark font-black px-8 py-4 rounded-2xl text-center text-lg hover:scale-105 transition-all shadow-[0_10px_40px_-10px_rgba(244,185,66,0.6)] flex items-center justify-center gap-3">
                <span className="relative z-10">Start Your Project</span>
                <i className="fa-solid fa-arrow-right relative z-10 group-hover:translate-x-1 transition-transform"></i>
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_forwards] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"></div>
              </Link>
              
              <Link href="/portfolio" className="glass-panel text-white font-bold px-8 py-4 rounded-2xl text-center hover:bg-white/10 transition-colors border border-gray-700 flex items-center justify-center gap-3 group">
                <i className="fa-solid fa-play text-gray-400 group-hover:text-white transition-colors"></i> View Our Work
              </Link>
            </div>
            
            {/* Tech Stack Footer */}
            <div className="pt-8 border-t border-gray-800/60 flex items-center gap-6 text-gray-500 text-sm font-medium uppercase tracking-widest">
              <span>Powered By</span>
              <div className="flex gap-4 text-xl">
                <i className="fa-brands fa-react hover:text-[#61dafb] transition-colors cursor-help" title="React"></i>
                <i className="fa-brands fa-node-js hover:text-[#68a063] transition-colors cursor-help" title="Node.js"></i>
                <i className="fa-brands fa-aws hover:text-[#ff9900] transition-colors cursor-help" title="AWS"></i>
              </div>
            </div>
          </div>
          
          {/* Right Visual Content */}
          <div data-aos="fade-left" data-aos-delay="200" className="relative order-1 lg:order-2 mt-10 lg:mt-0 perspective-1000 z-30">
            
            {/* The Main Mockup Frame */}
            <div className="relative z-10 w-full aspect-[4/3] md:aspect-video bg-[#1e293b] rounded-t-xl rounded-b-lg border border-gray-700 shadow-2xl flex flex-col overflow-hidden transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700">
               
               {/* Browser Top Bar */}
               <div className="h-8 w-full bg-[#0f172a] border-b border-gray-700 flex items-center px-4 gap-2 z-20">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto bg-[#1e293b] h-5 w-1/2 rounded text-[10px] text-center text-gray-500 flex items-center justify-center font-mono tracking-wider">
                    {industries[currentIndex].name.toLowerCase()}.com
                  </div>
               </div>

               {/* Mockup Images */}
               <div className="relative flex-1 w-full bg-dark overflow-hidden">
                 {industries.map((industry, idx) => (
                   <img 
                     key={industry.image}
                     src={industry.image} 
                     alt={`${industry.name} Website Mockup`} 
                     className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                       idx === currentIndex ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-sm'
                     }`} 
                   />
                 ))}
                 
                 {/* Dark Overlay gradient for text readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#060b1f] via-transparent to-transparent opacity-90"></div>
                 
                 {/* Floating Live Indicator inside frame */}
                 <div className="absolute bottom-6 left-6 right-6">
                   <div className="glass-panel rounded-2xl p-4 flex justify-between items-center shadow-2xl border border-white/10 backdrop-blur-xl transition-all duration-500 bg-white/5">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${industries[currentIndex].color} shadow-[0_0_20px_rgba(255,255,255,0.2)]`}>
                          <i className={`fa-solid ${industries[currentIndex].icon} text-xl`}></i>
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm md:text-base">Ready to Launch</div>
                          <div className="text-green-400 text-xs md:text-sm flex items-center gap-2 mt-0.5 font-medium">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Live Traffic
                          </div>
                        </div>
                      </div>
                   </div>
                 </div>
               </div>
            </div>
            
            {/* Floating Elements Outside Frame */}
            <div className="absolute -top-8 -right-8 glass-panel px-6 py-4 rounded-2xl flex items-center gap-4 z-30 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] border border-white/10 backdrop-blur-xl" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
                <i className="fa-solid fa-bolt text-xl"></i>
              </div>
              <div>
                 <div className="text-white font-black text-xl leading-none">99/100</div>
                 <div className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-1">Performance</div>
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
