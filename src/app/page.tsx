import Link from 'next/link';
import PortfolioSlider from '@/components/PortfolioSlider';

export default function Home() {
  return (
    <main>
{/* Hero Section */}
    <section id="home" className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px]"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2" data-aos="fade-right" data-aos-duration="1000">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 bg-gray-800/50 text-xs font-semibold tracking-wide text-gray-300 mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> WE BUILD WEBSITES THAT GROW BUSINESSES
                </div>
                <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-tight mb-6">
                    Stunning Websites.<br />
                    <span className="text-gradient">Stronger Businesses.</span>
                </h1>
                <p className="text-gray-400 text-lg mb-8 max-w-xl">
                    We design & develop modern, responsive, and SEO-friendly websites specifically tailored for Restaurants, Cafes, and Bhojnalayas to attract more customers.
                </p>
                
                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-300 mb-8 border-l-2 border-primary pl-4">
                    <div className="flex items-center gap-2"><i className="fa-solid fa-star text-primary"></i> 25+ Restaurant Websites Delivered</div>
                    <div className="hidden sm:block text-gray-600">|</div>
                    <div className="flex items-center gap-2"><i className="fa-solid fa-mobile-screen-button text-primary"></i> 100% Mobile Friendly</div>
                    <div className="hidden sm:block text-gray-600">|</div>
                    <div className="flex items-center gap-2"><i className="fa-solid fa-magnifying-glass-chart text-primary"></i> SEO Optimized</div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <a href="#pricing" className="bg-gradient-primary px-8 py-3.5 rounded-full font-medium hover:glow transition flex items-center gap-2">
                        View Packages <i className="fa-solid fa-arrow-right"></i>
                    </a>
                    <a href="#portfolio" className="px-8 py-3.5 rounded-full font-medium border border-gray-600 hover:border-white hover:bg-white/5 transition flex items-center gap-2">
                        View Our Work <i className="fa-regular fa-circle-play"></i>
                    </a>
                </div>
            </div>
            <div className="lg:w-1/2 relative" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full -z-10"></div>
                
                {/* Main Desktop Mockup */}
                <div className="relative w-full aspect-[16/10] bg-card rounded-xl border border-gray-700 shadow-2xl shadow-primary/20 overflow-hidden [transform:perspective(1000px)_rotateY(-12deg)_rotateX(5deg)] hover:[transform:perspective(1000px)_rotateY(0deg)_rotateX(0deg)] transition-all duration-700 ease-out z-10">
                     {/* Browser Header Bar */}
                     <div className="absolute top-0 left-0 w-full h-8 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-2 z-20">
                         <div className="w-3 h-3 rounded-full bg-red-500"></div>
                         <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                         <div className="w-3 h-3 rounded-full bg-green-500"></div>
                     </div>
                     <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Restaurant Website Mockup" className="w-full h-full object-cover pt-8 opacity-90 hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Floating Mobile Mockup */}
                <div className="absolute -bottom-10 -right-4 w-[30%] aspect-[9/19] bg-gray-900 rounded-[2rem] border-[6px] border-gray-800 shadow-2xl overflow-hidden [transform:perspective(1000px)_rotateY(-15deg)_rotateX(10deg)] z-20 animate-[bounce_4s_infinite]">
                     {/* Dynamic Island / Notch */}
                     <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[40%] h-5 bg-gray-900 rounded-full z-20"></div>
                     <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Mobile Website Mockup" className="w-full h-full object-cover" />
                </div>
                
                {/* Floating Badges */}
                <div className="absolute top-10 -left-8 glass-panel px-6 py-4 rounded-xl flex items-center gap-4 z-30 shadow-xl animate-[bounce_3s_infinite]">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <i className="fa-solid fa-rocket text-xl"></i>
                    </div>
                    <div>
                        <div className="font-bold text-lg text-white leading-tight">Lightning Fast</div>
                        <div className="text-xs text-gray-400">Better Performance</div>
                    </div>
                </div>
                
                <div className="absolute -bottom-6 -left-2 glass-panel px-6 py-4 rounded-xl flex items-center gap-4 z-30 shadow-xl animate-[bounce_3.5s_infinite]" style={{ animationDelay: '1s' }}>
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                        <i className="fa-solid fa-check text-xl"></i>
                    </div>
                    <div>
                        <div className="font-bold text-lg text-white leading-tight">SEO Optimized</div>
                        <div className="text-xs text-gray-400">Rank Higher</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Trusted By Banner */}
        <div className="container mx-auto px-6 lg:px-12 mt-32 border-t border-gray-800 pt-10 pb-8" data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-center text-xl md:text-2xl font-bold text-gray-300 tracking-wide"><i className="fa-solid fa-award text-primary mr-2"></i> Trusted by Local Restaurants & Cafes Across India</h3>
        </div>
    </section>

    {/* Portfolio Section */}
    <section id="portfolio" className="py-20 relative z-10 bg-card/30">
        <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16" data-aos="fade-up">
                <h4 className="text-primary font-semibold tracking-wider text-sm uppercase mb-2">Our Portfolio</h4>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">Featured Work</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">We take pride in delivering premium websites that are built to drive real results.</p>
            </div>
            
            <div className="relative w-full overflow-hidden py-10" data-aos="fade-up" data-aos-delay="100">
                {/* Fade Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>
                
                {/* Marquee Container */}
                <PortfolioSlider />
            </div>
            
            <div className="text-center mt-12">
                <a href="portfolio.html" className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-6 py-3 rounded-full hover:bg-primary hover:text-white transition font-medium">
                    View All Projects <i className="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </section>

    {/* What Your Website Will Include / Why Choose Us */}
    <section id="features" className="py-20 bg-dark relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16" data-aos="fade-up">
                <h4 className="text-primary font-semibold tracking-wider text-sm uppercase mb-2">Why Choose DevZilla</h4>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">What Your Website Will Include</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to grow your restaurant business online, built right in.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-card to-gray-900 border border-gray-800 p-6 rounded-2xl text-center hover:border-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 group relative overflow-hidden" data-aos="zoom-in" data-aos-delay="100">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="w-16 h-16 mx-auto rounded-full bg-card border border-gray-700 flex items-center justify-center text-primary text-2xl mb-4 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 relative z-10 shadow-lg">
                        <i className="fa-solid fa-mobile-screen-button"></i>
                    </div>
                    <h3 className="font-bold text-white text-sm md:text-base relative z-10">Mobile Responsive</h3>
                </div>
                <div className="bg-gradient-to-br from-card to-gray-900 border border-gray-800 p-6 rounded-2xl text-center hover:border-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 group relative overflow-hidden" data-aos="zoom-in" data-aos-delay="200">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="w-16 h-16 mx-auto rounded-full bg-card border border-gray-700 flex items-center justify-center text-primary text-2xl mb-4 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 relative z-10 shadow-lg">
                        <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <h3 className="font-bold text-white text-sm md:text-base relative z-10">Google Maps</h3>
                </div>
                <div className="bg-gradient-to-br from-card to-gray-900 border border-gray-800 p-6 rounded-2xl text-center hover:border-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 group relative overflow-hidden" data-aos="zoom-in" data-aos-delay="300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="w-16 h-16 mx-auto rounded-full bg-card border border-gray-700 flex items-center justify-center text-primary text-2xl mb-4 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 relative z-10 shadow-lg">
                        <i className="fa-brands fa-whatsapp"></i>
                    </div>
                    <h3 className="font-bold text-white text-sm md:text-base relative z-10">WhatsApp Chat</h3>
                </div>
                <div className="bg-gradient-to-br from-card to-gray-900 border border-gray-800 p-6 rounded-2xl text-center hover:border-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 group relative overflow-hidden" data-aos="zoom-in" data-aos-delay="400">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="w-16 h-16 mx-auto rounded-full bg-card border border-gray-700 flex items-center justify-center text-primary text-2xl mb-4 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 relative z-10 shadow-lg">
                        <i className="fa-solid fa-book-open"></i>
                    </div>
                    <h3 className="font-bold text-white text-sm md:text-base relative z-10">Digital Menu</h3>
                </div>
                <div className="bg-gradient-to-br from-card to-gray-900 border border-gray-800 p-6 rounded-2xl text-center hover:border-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 group relative overflow-hidden" data-aos="zoom-in" data-aos-delay="500">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="w-16 h-16 mx-auto rounded-full bg-card border border-gray-700 flex items-center justify-center text-primary text-2xl mb-4 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 relative z-10 shadow-lg">
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <h3 className="font-bold text-white text-sm md:text-base relative z-10">Reviews Section</h3>
                </div>
                <div className="bg-gradient-to-br from-card to-gray-900 border border-gray-800 p-6 rounded-2xl text-center hover:border-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 group relative overflow-hidden" data-aos="zoom-in" data-aos-delay="600">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="w-16 h-16 mx-auto rounded-full bg-card border border-gray-700 flex items-center justify-center text-primary text-2xl mb-4 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 relative z-10 shadow-lg">
                        <i className="fa-solid fa-phone-volume"></i>
                    </div>
                    <h3 className="font-bold text-white text-sm md:text-base relative z-10">One Click Calling</h3>
                </div>
                <div className="bg-gradient-to-br from-card to-gray-900 border border-gray-800 p-6 rounded-2xl text-center hover:border-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 group relative overflow-hidden" data-aos="zoom-in" data-aos-delay="700">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="w-16 h-16 mx-auto rounded-full bg-card border border-gray-700 flex items-center justify-center text-primary text-2xl mb-4 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 relative z-10 shadow-lg">
                        <i className="fa-solid fa-bolt"></i>
                    </div>
                    <h3 className="font-bold text-white text-sm md:text-base relative z-10">Fast Loading</h3>
                </div>
                <div className="bg-gradient-to-br from-card to-gray-900 border border-gray-800 p-6 rounded-2xl text-center hover:border-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 group relative overflow-hidden" data-aos="zoom-in" data-aos-delay="800">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="w-16 h-16 mx-auto rounded-full bg-card border border-gray-700 flex items-center justify-center text-primary text-2xl mb-4 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 relative z-10 shadow-lg">
                        <i className="fa-solid fa-magnifying-glass-chart"></i>
                    </div>
                    <h3 className="font-bold text-white text-sm md:text-base relative z-10">SEO Optimized</h3>
                </div>
            </div>
        </div>
    </section>

    {/* Pricing Section (Based on Image 2) */}
    <section id="pricing" className="py-20 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16" data-aos="fade-up">
                <h4 className="text-primary font-semibold tracking-wider text-sm uppercase mb-2">Pricing Plans</h4>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">Choose The Perfect Plan</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Simple, transparent pricing for every restaurant size. Get your Bhojnalaya or Fine Dining restaurant online today.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Basic Plan */}
                <div className="pricing-card bg-card border border-gray-800 rounded-2xl p-8 flex flex-col relative" data-aos="fade-up" data-aos-delay="100">
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-500 rounded-t-2xl"></div>
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold mb-2">Basic</h3>
                        <p className="text-gray-400 text-sm h-10">Perfect for Small Bhojnalaya to start online presence.</p>
                    </div>
                    <div className="mb-6">
                        <div className="text-gray-500 line-through text-lg">₹17,999</div>
                        <div className="text-4xl font-bold text-white mb-2">₹9,999</div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-green-400 bg-green-400/10 inline-block px-3 py-1 rounded-full border border-green-400/20">One Time Payment</div>
                    </div>
                    
                    <div className="w-full h-px bg-gray-800 mb-6"></div>
                    
                    <ul className="space-y-4 mb-8 flex-grow text-sm text-gray-300">
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-1"></i> Premium Landing Page</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-1"></i> Mobile Responsive Design</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-1"></i> Menu Section</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-1"></i> Gallery (Up to 15 Photos)</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-1"></i> Google Reviews Section</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-1"></i> Google Maps Integration</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-1"></i> WhatsApp & Call Button</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-green-500 mt-1"></i> Basic SEO Setup & Speed Optimization</li>
                    </ul>
                    <a href="#" className="w-full py-3 rounded-lg border border-gray-700 text-center font-medium hover:bg-gray-800 transition">Get Started</a>
                </div>

                {/* Standard Plan (Popular) */}
                <div className="pricing-card bg-card border border-primary relative rounded-2xl p-8 flex flex-col transform md:-translate-y-4 shadow-2xl shadow-primary/20" data-aos="fade-up" data-aos-delay="200">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                        Most Popular
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-t-2xl"></div>
                    <div className="mb-6 mt-2">
                        <h3 className="text-2xl font-bold mb-2">Standard</h3>
                        <p className="text-gray-400 text-sm h-10">Best for Restaurants looking to grow their business.</p>
                    </div>
                    <div className="mb-6">
                        <div className="text-gray-500 line-through text-lg">₹23,999</div>
                        <div className="text-5xl font-bold text-white mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">₹14,999</div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-400/10 inline-block px-3 py-1 rounded-full border border-blue-400/20">One Time Payment</div>
                    </div>
                    
                    <div className="w-full h-px bg-gray-800 mb-6"></div>
                    
                    <ul className="space-y-4 mb-8 flex-grow text-sm text-gray-300">
                        <li className="flex items-start gap-3 text-white font-medium"><i className="fa-solid fa-check text-blue-500 mt-1"></i> Everything in BASIC +</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-blue-500 mt-1"></i> Multi-Page Website (5-7 Pages)</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-blue-500 mt-1"></i> About Us & Why Choose Us</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-blue-500 mt-1"></i> Customer Reviews Section</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-blue-500 mt-1"></i> Online Reservation Form</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-blue-500 mt-1"></i> Food Categories & Advanced Gallery</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-blue-500 mt-1"></i> WhatsApp Order / Inquiry</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-blue-500 mt-1"></i> Better SEO (On-page + Technical)</li>
                    </ul>
                    <a href="#" className="w-full py-3 rounded-lg bg-gradient-primary text-center font-medium hover:glow transition text-white">Get Started</a>
                </div>

                {/* Premium Plan */}
                <div className="pricing-card bg-card border border-gray-800 rounded-2xl p-8 flex flex-col relative" data-aos="fade-up" data-aos-delay="300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 rounded-t-2xl"></div>
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold mb-2">Premium</h3>
                        <p className="text-gray-400 text-sm h-10">Complete solution for serious restaurants.</p>
                    </div>
                    <div className="mb-6">
                        <div className="text-gray-500 line-through text-lg">₹34,999</div>
                        <div className="text-4xl font-bold text-white mb-2">₹21,999</div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 inline-block px-3 py-1 rounded-full border border-amber-400/20">One Time Payment</div>
                    </div>
                    
                    <div className="w-full h-px bg-gray-800 mb-6"></div>
                    
                    <ul className="space-y-4 mb-8 flex-grow text-sm text-gray-300">
                        <li className="flex items-start gap-3 text-white font-medium"><i className="fa-solid fa-check text-amber-500 mt-1"></i> Everything in STANDARD +</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-amber-500 mt-1"></i> Online Ordering System</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-amber-500 mt-1"></i> Admin Dashboard</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-amber-500 mt-1"></i> Dynamic Menu (Easy to Update)</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-amber-500 mt-1"></i> Google Analytics Setup</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-amber-500 mt-1"></i> Advanced SEO (Schema + Local)</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-amber-500 mt-1"></i> Premium Animations</li>
                        <li className="flex items-start gap-3"><i className="fa-solid fa-check text-amber-500 mt-1"></i> Priority Support</li>
                    </ul>
                    <a href="#" className="w-full py-3 rounded-lg border border-gray-700 text-center font-medium hover:bg-gray-800 transition">Get Started</a>
                </div>
            </div>
            
            {/* Additional Details & Maintenance */}
            <div className="mt-16" data-aos="fade-up">
                {/* Highlighted Maintenance Banner */}
                <div className="bg-gradient-to-r from-card to-gray-900 border border-primary/50 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between shadow-lg shadow-primary/10 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="md:w-2/3 mb-6 md:mb-0 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                            <i className="fa-solid fa-star"></i> Revenue Booster
                        </div>
                        <h3 className="text-2xl font-bold mb-2 flex items-center gap-3"><i className="fa-solid fa-screwdriver-wrench text-primary"></i> Professional Website Maintenance</h3>
                        <p className="text-gray-400 mb-4">Keep your website updated, secure & running smoothly without any technical headache.</p>
                        <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-300">
                            <span className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Content Updates</span>
                            <span className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Regular Backups</span>
                            <span className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Security Checks</span>
                            <span className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Technical Support</span>
                        </div>
                    </div>
                    <div className="bg-dark/50 border border-gray-700 p-6 rounded-xl text-center min-w-[200px] relative z-10">
                        <div className="text-3xl font-bold text-white mb-1">₹999 <span className="text-sm text-gray-400 font-normal">/ Month</span></div>
                        <div className="text-xs text-primary font-semibold">or ₹9,999 / Year (Save 17%)</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Domain & Hosting */}
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><i className="fa-solid fa-globe text-blue-400"></i> Domain & Hosting (Annual)</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex justify-between border-b border-gray-800 pb-2"><span>.com Domain</span> <span>₹900 - ₹1,200/yr</span></div>
                            <div className="flex justify-between border-b border-gray-800 pb-2"><span>.in Domain</span> <span>₹500 - ₹800/yr</span></div>
                            <div className="flex justify-between border-b border-gray-800 pb-2"><span>Premium Hosting</span> <span>₹1,800 - ₹2,500/yr</span></div>
                            <div className="mt-4 pt-2 text-white font-medium">Approx Total: ₹2,300 - ₹3,500 / year</div>
                        </div>
                    </div>
                    
                    {/* Add-ons */}
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><i className="fa-solid fa-puzzle-piece text-orange-400"></i> Add-on Features</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex justify-between border-b border-gray-800 pb-2"><span>Full Online Ordering</span> <span>₹8,000 - ₹15,000</span></div>
                            <div className="flex justify-between border-b border-gray-800 pb-2"><span>Payment Gateway</span> <span>₹3,000 - ₹5,000</span></div>
                            <div className="flex justify-between border-b border-gray-800 pb-2"><span>Multi Branch Mgmt</span> <span>₹5,000+</span></div>
                            <div className="mt-4 pt-2 text-white font-medium text-xs">* Custom features available on request</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-20 bg-dark relative z-10 border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16" data-aos="fade-up">
                <h4 className="text-primary font-semibold tracking-wider text-sm uppercase mb-2">Client Reviews</h4>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">What Our Clients Say</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Trusted by restaurant owners across India to deliver results.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Testimonial 1 */}
                <div className="bg-card border border-gray-800 p-8 rounded-2xl relative" data-aos="fade-up" data-aos-delay="100">
                    <i className="fa-solid fa-quote-left text-4xl text-gray-800 absolute top-6 left-6 -z-10"></i>
                    <div className="flex text-primary mb-4 text-sm">
                        <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                    <p className="text-gray-300 italic mb-6">"Website banne ke baad customers ko menu aur location find karna easy ho gaya. Extremely happy with the service!"</p>
                    <div className="flex items-center gap-4 border-t border-gray-800 pt-4">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400"><i className="fa-solid fa-user"></i></div>
                        <div>
                            <div className="font-bold text-white text-sm">Restaurant Owner</div>
                            <div className="text-xs text-gray-500">Local Fine Dining</div>
                        </div>
                    </div>
                </div>
                {/* Testimonial 2 */}
                <div className="bg-card border border-gray-800 p-8 rounded-2xl relative" data-aos="fade-up" data-aos-delay="200">
                    <i className="fa-solid fa-quote-left text-4xl text-gray-800 absolute top-6 left-6 -z-10"></i>
                    <div className="flex text-primary mb-4 text-sm">
                        <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                    <p className="text-gray-300 italic mb-6">"Professional design ne business ki image improve ki. Online orders and inquiries have gone up significantly."</p>
                    <div className="flex items-center gap-4 border-t border-gray-800 pt-4">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400"><i className="fa-solid fa-user"></i></div>
                        <div>
                            <div className="font-bold text-white text-sm">Cafe Owner</div>
                            <div className="text-xs text-gray-500">Premium Coffee Shop</div>
                        </div>
                    </div>
                </div>
                {/* Testimonial 3 */}
                <div className="bg-card border border-gray-800 p-8 rounded-2xl relative" data-aos="fade-up" data-aos-delay="300">
                    <i className="fa-solid fa-quote-left text-4xl text-gray-800 absolute top-6 left-6 -z-10"></i>
                    <div className="flex text-primary mb-4 text-sm">
                        <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                    </div>
                    <p className="text-gray-300 italic mb-6">"Fast delivery and amazing support. Everything was explained clearly and the site looks very beautiful on mobile."</p>
                    <div className="flex items-center gap-4 border-t border-gray-800 pt-4">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400"><i className="fa-solid fa-user"></i></div>
                        <div>
                            <div className="font-bold text-white text-sm">Bhojnalaya Owner</div>
                            <div className="text-xs text-gray-500">Family Restaurant</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="bg-gradient-to-r from-card to-gray-900 border border-primary/40 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-primary/10" data-aos="zoom-in">
                <div className="mb-8 md:mb-0 md:w-2/3">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">🚀 Get Your Restaurant Online In 7 Days</h2>
                    <p className="text-gray-300 font-medium text-lg">Professional Website + WhatsApp Integration + Google Maps + Mobile Responsive</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="https://wa.me/919244161044" className="bg-primary hover:bg-yellow-500 px-8 py-4 rounded-full font-bold text-dark transition flex items-center gap-2 whitespace-nowrap shadow-lg shadow-primary/30">
                        Get Free Consultation <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

        </main>
  );
}