export default function WebsiteVsNoWebsite() {
  return (
    <section id="comparison" className="py-24 relative z-10 bg-[#0a102e]/50 border-y border-gray-800">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">The Cost of <span className="text-red-500">Being Invisible</span></h2>
          <p className="text-gray-400 text-lg">In today&apos;s digital world, if your business isn&apos;t online, you are losing customers to competitors who are.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Without Website */}
          <div 
            className="glass-card rounded-3xl p-8 md:p-12 border-t-4 border-t-red-500/50 hover:border-t-red-500 transition-colors"
            data-aos="fade-right"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xl">
                <i className="fa-solid fa-xmark"></i>
              </div>
              <h3 className="text-2xl font-bold text-white">Without a Website</h3>
            </div>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xs">
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-200">Invisible Menu</h4>
                  <p className="text-gray-400 text-sm mt-1">Customers can&apos;t find what you sell before visiting.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xs">
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-200">Hard to Locate</h4>
                  <p className="text-gray-400 text-sm mt-1">No direct Google Maps integration makes finding you frustrating.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xs">
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-200">Lower Trust</h4>
                  <p className="text-gray-400 text-sm mt-1">A missing online presence looks unprofessional in 2026.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xs">
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-200">Missed Inquiries</h4>
                  <p className="text-gray-400 text-sm mt-1">Losing potential customers who wanted to order via WhatsApp.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* With DevZilla */}
          <div 
            className="glass-card rounded-3xl p-8 md:p-12 border-t-4 border-t-green-500 shadow-[0_0_40px_rgba(34,197,94,0.1)] hover:shadow-[0_0_50px_rgba(34,197,94,0.15)] transition-shadow relative overflow-hidden"
            data-aos="fade-left"
          >
            <div className="absolute -right-16 -top-16 w-40 h-40 bg-green-500/20 rounded-full blur-[40px]"></div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xl shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <i className="fa-solid fa-check"></i>
              </div>
              <h3 className="text-2xl font-bold text-white">With DevZilla</h3>
            </div>
            
            <ul className="space-y-6 relative z-10">
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs shadow-lg shadow-green-500/30">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white">Online Visibility</h4>
                  <p className="text-green-100/70 text-sm mt-1">Rank on Google and capture local searches effortlessly.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs shadow-lg shadow-green-500/30">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white">Professional Image</h4>
                  <p className="text-green-100/70 text-sm mt-1">Premium design that builds instant trust with your customers.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs shadow-lg shadow-green-500/30">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white">More Inquiries</h4>
                  <p className="text-green-100/70 text-sm mt-1">Turn visitors into paying customers with optimized layouts.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs shadow-lg shadow-green-500/30">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white">Easy Contact</h4>
                  <p className="text-green-100/70 text-sm mt-1">Direct WhatsApp buttons for zero-friction ordering and booking.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
