import Link from 'next/link';

export default function PortfolioShowcase() {
  const projects = [
    {
      name: "Royal Tadka",
      type: "Restaurant Website",
      image: "/assets/Works/image copy.png",
      features: ["Online Menu", "WhatsApp Ordering", "Google Maps", "Mobile Responsive"],
    },
    {
      name: "Elite Fitness",
      type: "Gym & Fitness",
      image: "/assets/Works/image copy 2.png",
      features: ["Membership Plans", "Trainer Profiles", "WhatsApp Inquiry", "Location Maps"],
    },
    {
      name: "City Care Hospital",
      type: "Hospital & Clinic",
      image: "/assets/Works/image copy 3.png",
      features: ["Doctor Profiles", "Appointment Booking", "Emergency Contact", "Services List"],
    },
    {
      name: "Skyline Real Estate",
      type: "Real Estate Agency",
      image: "/assets/Works/image copy 4.png",
      features: ["Property Listings", "High-Res Gallery", "WhatsApp Contact", "Lead Forms"],
    },
    {
      name: "Glamour Salon",
      type: "Salon & Spa",
      image: "/assets/Works/image copy 5.png",
      features: ["Service Pricing", "Online Booking", "Customer Reviews", "Gallery"],
    },
    {
      name: "Toppers Coaching",
      type: "Educational Institute",
      image: "/assets/Works/image copy 6.png",
      features: ["Course Details", "Student Results", "Admission Forms", "Faculty Profiles"],
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Proven Results Across <span className="text-gradient">Every Industry</span></h2>
          <p className="text-gray-400 text-lg">We don&apos;t just build restaurant websites. We craft premium digital experiences that drive growth for all local businesses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="glass-card rounded-2xl overflow-hidden group flex flex-col"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Image Container with 3D-like hover */}
              <div className="h-64 overflow-hidden relative border-b border-gray-800">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-[6000ms] ease-linear group-hover:scale-110 group-hover:object-bottom"
                />
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute top-4 right-4 bg-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700 text-xs font-bold text-primary">
                  {project.type}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold mb-4">{project.name}</h3>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {project.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-sm text-gray-300">
                      <i className="fa-solid fa-check-circle text-primary mr-3 text-sm"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href="/portfolio" className="w-full block text-center py-3 rounded-xl border border-primary/30 text-primary font-bold hover:bg-primary hover:text-dark transition-all duration-300 shadow-[0_0_15px_rgba(244,185,66,0.1)] hover:shadow-[0_0_20px_rgba(244,185,66,0.4)]">
                  View Live Demo
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center" data-aos="fade-up">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition font-medium border-b border-transparent hover:border-primary pb-1">
            View All Our Projects <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
