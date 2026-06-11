'use client';

import { useState } from 'react';

const plans = [
  {
    name: 'Launch Plan',
    subtitle: 'Perfect for Local Businesses & Startups',
    icon: 'fa-rocket',
    price: 9999,
    comparePrice: 15999,
    buttonText: 'Great for getting started',
    features: [
      'Up to 10 Target Keywords',
      'Google Business Profile Optimization',
      'Website Audit & Speed Optimization',
      'On-Page SEO (Up to 5 Pages)',
      'Basic AEO (FAQ & Snippet Optimization)',
      'Local Citations (Up to 10 Listings)',
      'Monthly Performance Report'
    ]
  },
  {
    name: 'Growth Plan',
    subtitle: 'Best for Growing Businesses & Agencies',
    icon: 'fa-chart-pie',
    price: 29999,
    comparePrice: 36999,
    popular: true,
    buttonText: 'Scale your visibility & traffic',
    features: [
      'Up to 20 Target Keywords',
      'Everything in Launch Plan',
      'Technical SEO (On-Page + Off-Page)',
      '4 AI-Assisted SEO Articles / Month',
      'Internal Linking Optimization',
      'AEO Optimization (FAQ, Snippets, Entities)',
      'GEO Foundations (AI Visibility Setup)',
      'Competitor Analysis (Basic)',
      'Bi-Weekly Performance Dashboard',
      'Priority Email Support'
    ]
  },
  {
    name: 'Authority Plan',
    subtitle: 'For Established Brands & High-Growth Companies',
    icon: 'fa-crown',
    price: 59999,
    comparePrice: 74999,
    buttonText: 'Dominate search & AI results',
    features: [
      'Up to 40 Target Keywords',
      'Everything in Growth Plan',
      'Advanced Technical SEO',
      '8 AI-Assisted SEO Articles / Month',
      '1 Pillar Content / Month',
      'Schema Markup (Advanced)',
      'AEO + GEO Optimization (AI Search Visibility)',
      'Competitor Content Gap Analysis (Advanced)',
      'Premium Reporting + Monthly Strategy Call',
      'Priority WhatsApp & Call Support'
    ]
  }
];

const freeInclusions = [
  { name: 'Website Audit', desc: 'Technical & On-Page Audit Report', icon: 'fa-magnifying-glass-chart' },
  { name: 'Basic Analytics Setup', desc: 'GA4, GSC & Conversion Tracking Setup', icon: 'fa-chart-line' },
  { name: 'Monthly Reports', desc: 'Easy-to-understand Performance Reports', icon: 'fa-file-invoice' },
  { name: 'Basic Keyword Research', desc: 'High-intent keywords identified', icon: 'fa-key' },
  { name: 'Consultation Research', desc: 'Email Support During Work Hours', icon: 'fa-headset' },
  { name: 'CMS Guidance', desc: 'Basic Training to Manage Your Website', icon: 'fa-laptop-code' }
];

const addons = [
  { name: 'Content Writing (Extra)', price: '₹2,500 / Article', desc: 'AI-Assisted SEO Article (Human Refined)' },
  { name: 'Link Building (Quality)', price: '₹5,000 / 10 Links', desc: 'High DA/DR Backlinks' },
  { name: 'Local SEO Booster', price: '₹3,000 / mo', desc: 'More Citations, Reviews & Local Signals' },
  { name: 'Google Ads Management', price: '₹7,000 / mo', desc: 'Setup + Optimize + Monthly Management' },
  { name: 'Reputation Management', price: '₹3,500 / mo', desc: 'Reviews Monitoring & Response' },
  { name: 'Conversion Rate Optimization', price: '₹6,000 / mo', desc: 'CRO Audit & Recommendations' },
  { name: 'Landing Page Creation', price: '₹4,500 / Page', desc: 'High Converting Landing Page' },
  { name: 'Social Media Management', price: '₹6,000 / mo', desc: 'Content + Posting + Engagement' }
];

export default function SeoPricing() {
  return (
    <section id="pricing" className="py-24 relative z-10 bg-dark">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AI Search <span className="text-gradient">Growth Programs</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            SEO + AEO + GEO Solutions to Grow Your Visibility on Google, ChatGPT, Gemini & Beyond
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              data-aos="fade-up" 
              data-aos-delay={idx * 100}
              className={`relative rounded-3xl p-8 transition-all border flex flex-col ${
                plan.popular 
                  ? 'bg-gradient-to-b from-[#0c1432] to-[#060b1f] border-primary shadow-[0_0_30px_rgba(244,185,66,0.15)] transform md:-translate-y-4' 
                  : 'glass-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-dark text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-gray-800 text-gray-400'}`}>
                  <i className={`fa-solid ${plan.icon}`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-gray-400">{plan.subtitle}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-gray-500 line-through text-sm font-mono mb-1">₹{plan.comparePrice.toLocaleString('en-IN')}</div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-white font-mono">₹{plan.price.toLocaleString('en-IN')}</span>
                  <span className="text-gray-400 mb-1">/ mo</span>
                </div>
              </div>

              <div className="mb-8 flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-300">
                      <i className="fa-solid fa-circle-check text-primary mt-1"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                plan.popular ? 'bg-primary text-dark hover:bg-primary-hover shadow-lg' : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Inclusions & Addons Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Free Inclusions */}
          <div data-aos="fade-right" className="glass-card rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-gray-800 pb-4">
              <i className="fa-solid fa-gift text-primary text-2xl"></i> FREE Inclusions With All Plans
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {freeInclusions.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-primary mb-1">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Modular Add-ons */}
          <div data-aos="fade-left" className="glass-card rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-gray-800 pb-4">
              <i className="fa-solid fa-puzzle-piece text-blue-400 text-2xl"></i> Modular Add-ons
            </h3>
            <div className="space-y-4">
              {addons.map((addon, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-800">
                  <div>
                    <h4 className="text-sm font-bold text-white">{addon.name}</h4>
                    <p className="text-xs text-gray-500">{addon.desc}</p>
                  </div>
                  <div className="text-sm font-mono font-bold text-primary whitespace-nowrap ml-4">
                    {addon.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 pt-12 border-t border-gray-800">
          <div className="flex flex-col items-center text-center max-w-[200px]">
            <i className="fa-solid fa-file-contract text-2xl text-gray-400 mb-3"></i>
            <h4 className="text-sm font-bold text-white mb-1">No Long-Term Contracts</h4>
            <p className="text-xs text-gray-500">Cancel anytime with 30 days notice</p>
          </div>
          <div className="flex flex-col items-center text-center max-w-[200px]">
            <i className="fa-solid fa-tags text-2xl text-gray-400 mb-3"></i>
            <h4 className="text-sm font-bold text-white mb-1">Transparent Pricing</h4>
            <p className="text-xs text-gray-500">No hidden costs, what you see is what you pay</p>
          </div>
          <div className="flex flex-col items-center text-center max-w-[200px]">
            <i className="fa-solid fa-bullseye text-2xl text-gray-400 mb-3"></i>
            <h4 className="text-sm font-bold text-white mb-1">Results Driven Approach</h4>
            <p className="text-xs text-gray-500">Focus on Traffic, Leads & Business Growth</p>
          </div>
        </div>
      </div>
    </section>
  );
}
