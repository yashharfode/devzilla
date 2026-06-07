export default function Benefits() {
  const benefits = [
    {
      icon: "fa-mobile-screen",
      title: "Mobile Responsive",
      description: "Over 80% of your customers browse on their phones. A perfect mobile experience ensures they don&apos;t bounce to a competitor."
    },
    {
      icon: "fa-whatsapp",
      title: "WhatsApp Integration",
      description: "Remove the friction of ordering. Let customers message, book tables, or order food instantly via WhatsApp."
    },
    {
      icon: "fa-map-location-dot",
      title: "Google Maps Ready",
      description: "Integrated maps make it effortless for customers to find your physical location and get driving directions instantly."
    },
    {
      icon: "fa-magnifying-glass-chart",
      title: "SEO Optimization",
      description: "Rank higher when locals search for 'restaurants near me' on Google. More visibility means more foot traffic."
    },
    {
      icon: "fa-book-open",
      title: "Digital Menu",
      description: "Ditch the clunky PDFs. Give customers a fast, interactive digital menu they can easily read on any device."
    },
    {
      icon: "fa-bolt",
      title: "Lightning Fast",
      description: "Slow websites lose customers. Our Next.js architecture guarantees sub-second load times."
    }
  ];

  return (
    <section id="benefits" className="py-24 relative z-10 bg-dark/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Features That Actually <span className="text-gradient">Grow Your Business</span></h2>
          <p className="text-gray-400 text-lg">We don&apos;t just build beautiful websites. We build conversion machines designed specifically to turn your website visitors into paying customers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-2xl group relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500"></div>
              
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-dark text-2xl mb-6 shadow-lg">
                <i className={`fa-solid ${benefit.icon}`}></i>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
