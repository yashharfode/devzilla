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
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative z-10 bg-dark/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Don&apos;t Just Take <span className="text-gradient">Our Word</span> For It</h2>
          <p className="text-gray-400 text-lg">Hear from business owners just like you who have transformed their online presence and grown their revenue.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-3xl relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
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
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full border-2 border-primary/50" />
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
