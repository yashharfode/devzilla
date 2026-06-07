import Link from 'next/link';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent <span className="text-gradient">Pricing</span></h2>
          <p className="text-gray-400 text-lg">One-time payment for the website design. No hidden fees. A website that pays for itself with just a few new customers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Basic Plan */}
          <div className="glass-card rounded-3xl p-8 flex flex-col mt-4 md:mt-8" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-2xl font-bold text-white mb-2">Basic</h3>
            <p className="text-gray-400 text-sm mb-6">Perfect for small cafes starting out.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">₹9,999</span>
              <span className="text-gray-500 text-sm"> / one-time</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> Single Page Website</li>
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> Custom Design</li>
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> Mobile Responsive</li>
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> WhatsApp Button</li>
            </ul>
            <Link href="https://wa.me/919244161044" className="w-full block text-center py-3 rounded-xl border border-gray-700 text-white hover:bg-gray-800 transition-colors">
              Choose Basic
            </Link>
          </div>

          {/* Premium Plan (Highlighted) */}
          <div className="glass-card rounded-3xl p-8 flex flex-col border border-primary relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(244,185,66,0.15)]" data-aos="fade-up" data-aos-delay="200">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-primary text-dark font-bold px-4 py-1 rounded-full text-sm">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Standard</h3>
            <p className="text-gray-400 text-sm mb-6">Best for established restaurants.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">₹14,999</span>
              <span className="text-gray-500 text-sm"> / one-time</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> Up to 5 Pages</li>
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> Premium Animations</li>
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> Google Maps Integration</li>
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> Advanced SEO Setup</li>
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> Contact Forms</li>
            </ul>
            <Link href="https://wa.me/919244161044" className="w-full block text-center py-3 rounded-xl bg-gradient-primary text-dark font-bold hover:scale-105 transition-transform shadow-[0_0_15px_rgba(244,185,66,0.4)]">
              Choose Standard
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="glass-card rounded-3xl p-8 flex flex-col mt-4 md:mt-8" data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
            <p className="text-gray-400 text-sm mb-6">For multi-location or large hotels.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">₹21,999</span>
              <span className="text-gray-500 text-sm"> / one-time</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> Up to 10 Pages</li>
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> E-commerce/Ordering Ready</li>
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> Payment Gateway</li>
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> Priority Support</li>
              <li className="flex items-start gap-3 text-gray-300"><i className="fa-solid fa-check text-primary mt-1"></i> Custom Branding</li>
            </ul>
            <Link href="https://wa.me/919244161044" className="w-full block text-center py-3 rounded-xl border border-gray-700 text-white hover:bg-gray-800 transition-colors">
              Choose Premium
            </Link>
          </div>
        </div>

        {/* Included In Every Plan */}
        <div className="glass-panel max-w-4xl mx-auto rounded-3xl p-8 md:p-10 border border-primary/20" data-aos="fade-up">
          <h3 className="text-2xl font-bold text-center mb-8">Included In <span className="text-gradient">Every Plan</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl mb-3"><i className="fa-solid fa-mobile-screen"></i></div>
              <span className="text-sm font-medium text-gray-300">Mobile Friendly</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl mb-3"><i className="fa-solid fa-map-location-dot"></i></div>
              <span className="text-sm font-medium text-gray-300">Google Maps</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl mb-3"><i className="fa-brands fa-whatsapp"></i></div>
              <span className="text-sm font-medium text-gray-300">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl mb-3"><i className="fa-solid fa-server"></i></div>
              <span className="text-sm font-medium text-gray-300">Hosting Guidance</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl mb-3"><i className="fa-solid fa-chart-line"></i></div>
              <span className="text-sm font-medium text-gray-300">SEO Basics</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
