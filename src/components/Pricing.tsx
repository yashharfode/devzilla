'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<'restaurant' | 'common'>('restaurant');

  const pricingData = {
    restaurant: [
      {
        name: "Basic",
        desc: "Perfect for Small Bhojnalaya",
        price: "12,999",
        oldPrice: "17,999",
        features: [
          "Premium Landing Page",
          "Mobile Responsive Design",
          "Menu Section",
          "Gallery (Up to 15 Photos)",
          "Contact Form",
          "Google Maps Integration",
          "WhatsApp Button",
          "Call Button",
          "Basic SEO Setup",
          "Speed Optimization",
          "Social Media Links"
        ],
        highlight: false
      },
      {
        name: "Standard",
        desc: "Best for Restaurants",
        price: "17,999",
        oldPrice: "23,999",
        features: [
          <span key="bold" className="font-bold text-white">Everything in BASIC +</span>,
          "Multi-Page Website (5-7 Pages)",
          "About Us Page",
          "Why Choose Us Section",
          "Customer Reviews / Testimonials",
          "Special Offers / Combos",
          "Food Categories",
          "Advanced Gallery",
          "Better SEO (On-page + Technical)",
          "WhatsApp Order / Inquiry",
          "Google Analytics Setup",
          "Performance Optimization"
        ],
        highlight: true
      },
      {
        name: "Premium",
        desc: "Complete Solution for Serious Restaurants",
        price: "24,999",
        oldPrice: "34,999",
        features: [
          <span key="bold" className="font-bold text-white">Everything in STANDARD +</span>,
          "Online Table Reservation System",
          "Catering / Party Booking Form",
          "Dynamic Menu (Easy to Update)",
          "Admin Panel (Basic)",
          "Advanced SEO (Schema + Local SEO)",
          "Google Search Console Setup",
          "Live Chat / WhatsApp Chat",
          "Google Analytics + Events",
          "Custom Animations",
          "Priority Support"
        ],
        highlight: false
      }
    ],
    common: [
      {
        name: "Starter",
        desc: "Perfect for New Businesses",
        price: "9,999",
        oldPrice: "14,999",
        features: [
          "Premium Single Landing Page",
          "Mobile Responsive Design",
          "Services Section",
          "Basic Gallery (Up to 10 Photos)",
          "Contact Form",
          "Google Maps Integration",
          "WhatsApp Button",
          "Basic SEO Setup",
          "Speed Optimization",
          "Social Media Links"
        ],
        highlight: false
      },
      {
        name: "Professional",
        desc: "Best for Growing Agencies",
        price: "14,999",
        oldPrice: "21,999",
        features: [
          <span key="bold" className="font-bold text-white">Everything in STARTER +</span>,
          "Multi-Page Website (Up to 5 Pages)",
          "About Us & Team Page",
          "Testimonials / Case Studies",
          "Service Detail Pages",
          "Advanced Gallery",
          "Better SEO (On-page + Technical)",
          "Lead Capture Forms",
          "Google Analytics Setup",
          "Performance Optimization"
        ],
        highlight: true
      },
      {
        name: "Corporate",
        desc: "Complete Digital Presence",
        price: "21,999",
        oldPrice: "29,999",
        features: [
          <span key="bold" className="font-bold text-white">Everything in PROFESSIONAL +</span>,
          "Up to 10 Pages",
          "Dynamic Content (Easy to Update)",
          "Admin Panel (Basic)",
          "Advanced SEO (Schema + Local SEO)",
          "Google Search Console Setup",
          "Live Chat Integration",
          "Custom Animations",
          "Premium Stock Photos",
          "Priority Support"
        ],
        highlight: false
      }
    ]
  };

  const activePlans = pricingData[activeTab];

  return (
    <section id="pricing" className="py-24 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Website <span className="text-gradient">Packages</span></h2>
          <p className="text-gray-400 text-lg mb-8">Modern Design • Mobile Friendly • SEO Optimized • Fast & Secure</p>
          
          {/* Custom Tabs */}
          <div className="inline-flex bg-dark border border-gray-800 rounded-full p-1 shadow-lg">
            <button 
              onClick={() => setActiveTab('restaurant')}
              className={`px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${activeTab === 'restaurant' ? 'bg-gradient-primary text-dark shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              <i className="fa-solid fa-utensils mr-2"></i> Restaurants / Cafes
            </button>
            <button 
              onClick={() => setActiveTab('common')}
              className={`px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${activeTab === 'common' ? 'bg-gradient-primary text-dark shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              <i className="fa-solid fa-briefcase mr-2"></i> General Business
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {activePlans.map((plan, index) => (
            <div 
              key={index}
              className={`glass-card rounded-3xl p-8 flex flex-col mt-4 md:mt-8 transition-all ${plan.highlight ? 'border border-primary transform md:-translate-y-4 shadow-[0_0_30px_rgba(244,185,66,0.15)]' : ''}`} 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-primary text-dark font-bold px-4 py-1 rounded-full text-sm z-10">
                  MOST POPULAR
                </div>
              )}
              
              <div className="text-center border-b border-gray-800 pb-6 mb-6">
                <h3 className={`text-2xl font-bold mb-2 uppercase tracking-wide ${plan.highlight ? 'text-primary' : 'text-white'}`}>{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.desc}</p>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-gray-500 line-through text-lg mb-1">₹{plan.oldPrice}</span>
                  <span className="text-5xl font-bold text-white mb-2">₹{plan.price}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest border border-gray-700 rounded-full px-3 py-1">One Time Payment</span>
                </div>
              </div>
              
              <div className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Features Included</div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-gray-300 text-sm">
                    <i className="fa-solid fa-circle-check text-green-500 mt-1"></i> {feature}
                  </li>
                ))}
              </ul>
              
              <Link href={`https://wa.me/919244161034?text=Hi, I am interested in the ${plan.name} Plan for my business.`} className={`w-full block text-center py-3 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-gradient-primary text-dark hover:scale-105 shadow-[0_0_15px_rgba(244,185,66,0.4)]' : 'border border-gray-700 text-white hover:bg-gray-800'}`}>
                Choose {plan.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Extra Sections (Domain, Addons, Maintenance) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" data-aos="fade-up">
          
          {/* Domain & Hosting */}
          <div className="glass-card rounded-2xl overflow-hidden flex flex-col">
            <div className="bg-[#0a1535] py-4 text-center border-b border-blue-900/50">
              <h4 className="text-white font-bold"><i className="fa-solid fa-globe mr-2 text-blue-400"></i> DOMAIN & HOSTING (Annual)</h4>
            </div>
            <div className="p-6 flex-grow flex flex-col text-sm">
              <div className="mb-4">
                <span className="text-green-400 font-bold text-xs uppercase tracking-wider block mb-2">Domain (Choose Any One)</span>
                <ul className="space-y-2 text-gray-300 font-mono">
                  <li className="flex justify-between"><span>.com</span><span>₹900 - ₹1,200 / year</span></li>
                  <li className="flex justify-between"><span>.in</span><span>₹500 - ₹800 / year</span></li>
                  <li className="flex justify-between"><span>.co.in</span><span>₹600 - ₹900 / year</span></li>
                  <li className="flex justify-between"><span>.shop</span><span>₹300 - ₹600 / year</span></li>
                </ul>
              </div>
              <div className="mb-4">
                <span className="text-blue-400 font-bold text-xs uppercase tracking-wider block mb-2">Hosting (Recommended)</span>
                <div className="flex gap-3">
                  <i className="fa-solid fa-server text-blue-400 text-xl mt-1"></i>
                  <div>
                    <span className="text-white font-bold block">Premium Plan (Hostinger)</span>
                    <span className="text-gray-300 font-mono block">₹1,800 - ₹2,500 / year</span>
                    <span className="text-gray-500 text-xs block mt-1">(Free SSL, Unlimited Bandwidth, Email)</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto bg-primary/10 text-primary text-center py-2 rounded font-bold text-xs">
                Approx. Total (Domain + Hosting): ₹2,300 - ₹3,500 / year
              </div>
            </div>
          </div>

          {/* Add-on Features */}
          <div className="glass-card rounded-2xl overflow-hidden flex flex-col">
            <div className="bg-[#1a1305] py-4 text-center border-b border-primary/20">
              <h4 className="text-white font-bold"><i className="fa-solid fa-puzzle-piece mr-2 text-primary"></i> ADD-ON FEATURES (Extra)</h4>
            </div>
            <div className="p-6 flex-grow text-sm">
              <ul className="space-y-4 text-gray-300">
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="flex items-center gap-2"><i className="fa-solid fa-gear text-red-400 w-4"></i> Admin Panel (Advanced)</span>
                  <span className="font-mono">₹5,000 - ₹10,000</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="flex items-center gap-2"><i className="fa-solid fa-cart-shopping text-orange-400 w-4"></i> Add To Cart System</span>
                  <span className="font-mono">₹5,000 - ₹8,000</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="flex items-center gap-2"><i className="fa-solid fa-bag-shopping text-yellow-400 w-4"></i> Full Online Ordering</span>
                  <span className="font-mono">₹8,000 - ₹15,000</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="flex items-center gap-2"><i className="fa-solid fa-credit-card text-green-400 w-4"></i> Payment Gateway</span>
                  <span className="font-mono">₹3,000 - ₹5,000</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="flex items-center gap-2"><i className="fa-solid fa-users text-blue-400 w-4"></i> Customer Login</span>
                  <span className="font-mono">₹3,000 - ₹5,000</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><i className="fa-solid fa-code text-purple-400 w-4"></i> Custom Features</span>
                  <span className="font-mono text-primary text-xs">Price on Request</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Maintenance Service */}
          <div className="glass-card rounded-2xl overflow-hidden flex flex-col">
            <div className="bg-[#12051a] py-4 text-center border-b border-purple-900/50">
              <h4 className="text-white font-bold"><i className="fa-solid fa-shield-check mr-2 text-purple-400"></i> MAINTENANCE SERVICE</h4>
            </div>
            <div className="p-6 flex-grow flex flex-col text-sm">
              <p className="text-gray-400 text-center mb-6 text-xs">We keep your website updated, secure & running smoothly.</p>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3 text-gray-300">
                  <i className="fa-solid fa-circle-check text-purple-500 mt-0.5"></i> Regular Updates & Backups
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <i className="fa-solid fa-circle-check text-purple-500 mt-0.5"></i> Security Monitoring
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <i className="fa-solid fa-circle-check text-purple-500 mt-0.5"></i> Content / Menu Updates
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <i className="fa-solid fa-circle-check text-purple-500 mt-0.5"></i> Uptime Monitoring
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <i className="fa-solid fa-circle-check text-purple-500 mt-0.5"></i> Technical Support
                </li>
              </ul>
              
              <div className="mt-auto border border-purple-500/30 bg-purple-500/10 rounded-xl p-4 flex items-center justify-center gap-4">
                <i className="fa-solid fa-gear text-3xl text-purple-400"></i>
                <div>
                  <div className="text-xl font-bold text-white">₹999 <span className="text-sm text-gray-400 font-normal">/ Month</span></div>
                  <div className="text-xs text-purple-300">or ₹9,999 / Year (Save 17%)</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
