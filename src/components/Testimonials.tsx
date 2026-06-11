import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Owner, Royal Restaurant",
      image: "https://i.pravatar.cc/150?img=11",
      text: "Since DevZilla built our website with WhatsApp ordering, our daily takeaways have increased by 40%. Customers love how easy it is to find our menu and order directly. It paid for itself in the first week!"
    },
    {
      name: "Priya Patel",
      role: "Founder, Brew & Bites Cafe",
      image: "https://i.pravatar.cc/150?img=5",
      text: "We were invisible on Google before. Now, when tourists search for cafes near them, we show up on top with a beautiful website. The design is so premium, it matches the vibe of our cafe perfectly."
    },
    {
      name: "Amit Singh",
      role: "Manager, Desi Bhojnalaya",
      image: "https://i.pravatar.cc/150?img=8",
      text: "I didn&apos;t think a simple Bhojnalaya needed a website, but I was wrong. The Google Maps integration helps highway travelers find us easily. Best investment we&apos;ve made for our family business."
    },
    {
      name: "Neha Gupta",
      role: "Director, FitLife Gym",
      image: "https://i.pravatar.cc/150?img=9",
      text: "Our new website looks incredible. Since launching, we&apos;ve seen a huge spike in direct inquiries through the WhatsApp button. The mobile experience is flawlessly fast!"
    },
    {
      name: "Vikram Reddy",
      role: "Owner, Skyline Hotels",
      image: "https://i.pravatar.cc/150?img=12",
      text: "DevZilla completely transformed our online presence. Our old website looked outdated and was slow. The new one feels ultra-premium and has directly increased our room bookings."
    }
  ];

  // We duplicate the array multiple times to ensure the marquee never runs out of content on ultra-wide screens
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 relative z-10 bg-dark/50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Don&apos;t Just Take <span className="text-gradient">Our Word</span> For It</h2>
          <p className="text-gray-400 text-lg">Hear from business owners just like you who have transformed their online presence and grown their revenue.</p>
        </div>
      </div>

      <div className="relative w-full mt-4">
        {/* Gradient Edges for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee flex gap-6 md:gap-8 py-4 px-4">
          {doubledTestimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-3xl relative w-[320px] md:w-[450px] flex-shrink-0"
            >
              <div className="text-primary text-4xl opacity-20 absolute top-8 right-8">
                <i className="fa-solid fa-quote-right"></i>
              </div>
              
              <div className="flex gap-1 text-yellow-500 mb-6">
                <i className="fa-solid fa-star text-sm"></i>
                <i className="fa-solid fa-star text-sm"></i>
                <i className="fa-solid fa-star text-sm"></i>
                <i className="fa-solid fa-star text-sm"></i>
                <i className="fa-solid fa-star text-sm"></i>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 italic">
                &quot;{testimonial.text}&quot;
              </p>
              
              <div className="flex items-center gap-4 border-t border-gray-800 pt-6">
                <Image 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  width={56} 
                  height={56} 
                  className="w-14 h-14 rounded-full border-2 border-primary/50 object-cover" 
                />
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-primary text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
