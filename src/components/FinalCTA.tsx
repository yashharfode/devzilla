import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div 
          className="glass-card rounded-[2rem] md:rounded-[3rem] p-6 md:p-20 text-center relative overflow-hidden border border-primary/30 shadow-[0_0_50px_rgba(244,185,66,0.15)]"
          data-aos="zoom-in"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready To Get <span className="text-gradient">More Customers</span> Online?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Stop losing customers to your competitors. Let us build your premium, high-converting website and get it live in just 7 days.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link 
              href="https://wa.me/919244161044" 
              className="bg-gradient-primary text-dark font-bold px-10 py-5 rounded-2xl text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(244,185,66,0.4)] w-full sm:w-auto flex items-center justify-center gap-3"
            >
              <i className="fa-brands fa-whatsapp text-2xl"></i> WhatsApp Us Now
            </Link>
            <Link 
              href="tel:+919244161044" 
              className="glass-panel text-white font-bold px-10 py-5 rounded-2xl text-lg hover:bg-white/10 transition-colors w-full sm:w-auto flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-phone"></i> Book Free Consultation
            </Link>
          </div>
          
          <div className="mt-10 md:mt-12 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm font-medium text-gray-400">
            <div className="flex items-center gap-2"><i className="fa-solid fa-bolt text-yellow-500"></i> Fast Delivery</div>
            <div className="flex items-center gap-2"><i className="fa-solid fa-headset text-blue-400"></i> 24/7 Support</div>
            <div className="flex items-center gap-2"><i className="fa-solid fa-shield-halved text-green-400"></i> Secure & Reliable</div>
          </div>
        </div>
      </div>
    </section>
  );
}
