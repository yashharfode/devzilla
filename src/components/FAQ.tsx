'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does it take to build the website?",
      answer: "Your custom restaurant website will be fully designed, developed, and launched within 7 to 10 days after we receive your menu and photos."
    },
    {
      question: "Do I need to buy hosting or a domain name?",
      answer: "We guide you through the process. We can either host it on our premium blazing-fast servers, or help you set it up on your own hosting. Domain purchasing assistance is included in every plan."
    },
    {
      question: "Can customers order food online through the website?",
      answer: "Yes! Our websites come with direct WhatsApp ordering integration. Customers can browse your menu and send their order directly to your WhatsApp with one click, saving you zero commissions."
    },
    {
      question: "Can I update the menu or prices later?",
      answer: "Absolutely. We build the website so that menu items, prices, and photos can be easily updated. You can also opt for our Maintenance Plan where we handle all updates for you."
    },
    {
      question: "Will the website work well on mobile phones?",
      answer: "100%. Over 80% of restaurant searches happen on mobile. We design mobile-first, ensuring your website looks like a premium app on all smartphones."
    },
    {
      question: "Do you only make websites for restaurants?",
      answer: "While we specialize in food businesses (Restaurants, Cafes, Bhojnalayas, Hotels), our premium framework works exceptionally well for Gyms, Salons, Real Estate, and Coaching Institutes."
    },
    {
      question: "How does the SEO optimization help my business?",
      answer: "We structure your website so Google easily understands it. When someone nearby searches for 'best cafe near me' or your specific cuisine, your website has a much higher chance of appearing at the top."
    },
    {
      question: "What is the ₹999/month Maintenance Plan?",
      answer: "It's a completely optional 'peace of mind' package. For ₹999/month, we handle all technical updates, security backups, and up to 3 menu/content changes per month so you can focus purely on running your restaurant."
    }
  ];

  return (
    <section id="faq" className="py-24 relative z-10 border-t border-gray-800">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked <span className="text-gradient">Questions</span></h2>
          <p className="text-gray-400 text-lg">Everything you need to know about getting your business online.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="glass-card rounded-2xl overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-lg text-white pr-8">{faq.question}</span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300">
                  <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}></i>
                </span>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-400 leading-relaxed border-t border-gray-800 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
