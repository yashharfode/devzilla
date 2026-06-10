export type BasePackageId = 
  | 'basic_general' | 'standard_general' | 'premium_general'
  | 'basic_bhojnalaya' | 'standard_restaurant' | 'premium_restaurant' 
  | 'basic_clinic' | 'standard_hospital' | 'premium_hospital' | 'enterprise_hospital';

export type AddonId = 'admin_panel' | 'online_ordering' | 'table_reservation' | 'whatsapp_bot' | 'advanced_seo' | 'payment_gateway' | 'multi_language' | 'live_chat' | '1_month_maint' | '3_month_maint' | '6_month_maint';

export type SubFeature = {
  id: string;
  name: string;
  deductionValue: number;
};

export type BasePackageConfig = {
  name: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  features: SubFeature[];
  freeServices?: string[];
};

export const BasePackages: Record<BasePackageId, BasePackageConfig> = {
  // General Corporate / Business Packages
  basic_general: {
    name: 'Starter Business',
    price: 12999,
    compareAtPrice: 17999,
    description: 'Perfect for Small Businesses & Startups',
    features: [
      { id: 'gen_landing', name: 'Premium Landing Page', deductionValue: 3000 },
      { id: 'gen_mobile', name: 'Mobile Responsive Design', deductionValue: 1000 },
      { id: 'gen_services', name: 'Services / Products Section', deductionValue: 1500 },
      { id: 'gen_gallery', name: 'Business Portfolio (15 Photos)', deductionValue: 1000 },
      { id: 'gen_contact', name: 'Lead Capture Form', deductionValue: 1000 },
      { id: 'gen_maps', name: 'Google Maps Integration', deductionValue: 500 },
      { id: 'gen_whatsapp', name: 'WhatsApp & Call Button', deductionValue: 500 },
      { id: 'gen_seo', name: 'Basic SEO Setup', deductionValue: 1000 },
      { id: 'gen_speed', name: 'Speed Optimization', deductionValue: 1500 },
      { id: 'gen_social', name: 'Social Media Links', deductionValue: 500 }
    ],
    freeServices: ['1 Month Free Maintenance', 'Free Logo Design', 'Upto 3 Digital Marketing Posters']
  },
  standard_general: {
    name: 'Professional Business',
    price: 17999,
    compareAtPrice: 23999,
    description: 'Best for Growing Companies & Agencies',
    features: [
      { id: 'gen_std_pages', name: 'Multi-Page Website (5-7 Pages)', deductionValue: 4000 },
      { id: 'gen_std_about', name: 'About Us / Team Profiles', deductionValue: 1000 },
      { id: 'gen_std_reviews', name: 'Client Testimonials / Case Studies', deductionValue: 1000 },
      { id: 'gen_std_features', name: 'Detailed Service Pages', deductionValue: 1000 },
      { id: 'gen_std_faq', name: 'FAQ Section', deductionValue: 1000 },
      { id: 'gen_std_gallery', name: 'Advanced Portfolio Gallery', deductionValue: 1500 },
      { id: 'gen_std_seo', name: 'Better SEO (On-page + Technical)', deductionValue: 2000 },
      { id: 'gen_std_whatsapp', name: 'WhatsApp Inquiry Integration', deductionValue: 2000 },
      { id: 'gen_std_analytics', name: 'Google Analytics Setup', deductionValue: 1000 },
      { id: 'gen_std_perf', name: 'Performance Optimization', deductionValue: 1500 }
    ],
    freeServices: ['2 Months Free Maintenance', 'Free Logo Design', 'Upto 5 Digital Marketing Posters']
  },
  premium_general: {
    name: 'Corporate Elite',
    price: 24999,
    compareAtPrice: 34999,
    description: 'Complete Solution for Established Brands',
    features: [
      { id: 'gen_prem_booking', name: 'Online Booking / Consultation System', deductionValue: 4000 },
      { id: 'gen_prem_careers', name: 'Careers / Hiring Board', deductionValue: 2000 },
      { id: 'gen_prem_dynamic', name: 'Dynamic Service Catalog', deductionValue: 3000 },
      { id: 'gen_prem_admin', name: 'Admin Panel (Content Management)', deductionValue: 3000 },
      { id: 'gen_prem_seo', name: 'Advanced SEO (Schema + Local SEO)', deductionValue: 2500 },
      { id: 'gen_prem_gsc', name: 'Google Search Console Setup', deductionValue: 1000 },
      { id: 'gen_prem_chat', name: 'Live Chat / WhatsApp Chat', deductionValue: 1500 },
      { id: 'gen_prem_events', name: 'Google Analytics + Conversion Events', deductionValue: 1500 },
      { id: 'gen_prem_anim', name: 'Custom Professional Animations', deductionValue: 2000 },
      { id: 'gen_prem_support', name: 'Priority Support', deductionValue: 2000 }
    ],
    freeServices: ['3 Months Free Maintenance', 'Free Logo Design', 'Upto 8 Digital Marketing Posters', 'Dedicated Account Manager']
  },

  // Restaurant Packages
  basic_bhojnalaya: { 
    name: 'Basic', 
    price: 12999,
    compareAtPrice: 17999,
    description: 'Perfect for Small Bhojnalaya',
    features: [
      { id: 'bhoj_landing', name: 'Premium Landing Page', deductionValue: 3000 },
      { id: 'bhoj_mobile', name: 'Mobile Responsive Design', deductionValue: 1000 },
      { id: 'bhoj_menu', name: 'Menu Section', deductionValue: 1500 },
      { id: 'bhoj_gallery', name: 'Gallery (Up to 15 Photos)', deductionValue: 1000 },
      { id: 'bhoj_contact', name: 'Contact Form', deductionValue: 1000 },
      { id: 'bhoj_maps', name: 'Google Maps Integration', deductionValue: 500 },
      { id: 'bhoj_whatsapp', name: 'WhatsApp & Call Button', deductionValue: 500 },
      { id: 'bhoj_seo', name: 'Basic SEO Setup', deductionValue: 1000 },
      { id: 'bhoj_speed', name: 'Speed Optimization', deductionValue: 1500 },
      { id: 'bhoj_social', name: 'Social Media Links', deductionValue: 500 }
    ],
    freeServices: ['1 Month Free Maintenance', 'Free Logo Design', 'Upto 3 Digital Posters/Flyers (PNG/JPEG)']
  },
  standard_restaurant: { 
    name: 'Standard', 
    price: 17999,
    compareAtPrice: 23999,
    description: 'Best for Restaurants',
    features: [
      { id: 'std_pages', name: 'Multi-Page Website (5-7 Pages)', deductionValue: 4000 },
      { id: 'std_about', name: 'About Us / Why Choose Us', deductionValue: 1000 },
      { id: 'std_reviews', name: 'Customer Reviews / Testimonials', deductionValue: 1000 },
      { id: 'std_offers', name: 'Special Offers / Combos', deductionValue: 1000 },
      { id: 'std_categories', name: 'Food Categories', deductionValue: 1000 },
      { id: 'std_gallery', name: 'Advanced Gallery', deductionValue: 1500 },
      { id: 'std_seo', name: 'Better SEO (On-page + Technical)', deductionValue: 2000 },
      { id: 'std_whatsapp_order', name: 'WhatsApp Order / Inquiry', deductionValue: 2000 },
      { id: 'std_analytics', name: 'Google Analytics Setup', deductionValue: 1000 },
      { id: 'std_perf', name: 'Performance Optimization', deductionValue: 1500 }
    ],
    freeServices: ['2 Months Free Maintenance', 'Free Logo Design', 'Upto 5 Digital Posters/Flyers (PNG/JPEG)']
  },
  premium_restaurant: { 
    name: 'Premium', 
    price: 24999,
    compareAtPrice: 34999,
    description: 'Complete Solution for Serious Restaurants',
    features: [
      { id: 'prem_reserve', name: 'Online Table Reservation System', deductionValue: 4000 },
      { id: 'prem_catering', name: 'Catering / Party Booking Form', deductionValue: 2000 },
      { id: 'prem_menu', name: 'Dynamic Menu (Easy to Update)', deductionValue: 3000 },
      { id: 'prem_admin', name: 'Admin Panel (Basic)', deductionValue: 3000 },
      { id: 'prem_seo', name: 'Advanced SEO (Schema + Local SEO)', deductionValue: 2500 },
      { id: 'prem_gsc', name: 'Google Search Console Setup', deductionValue: 1000 },
      { id: 'prem_chat', name: 'Live Chat / WhatsApp Chat', deductionValue: 1500 },
      { id: 'prem_events', name: 'Google Analytics + Events', deductionValue: 1500 },
      { id: 'prem_anim', name: 'Custom Animations', deductionValue: 2000 },
      { id: 'prem_support', name: 'Priority Support', deductionValue: 2000 }
    ],
    freeServices: ['3 Months Free Maintenance', 'Free Logo Design', 'Upto 8 Digital Posters/Flyers (PNG/JPEG)', 'Dedicated Account Manager']
  },
  
  // Hospital & Clinic Packages
  basic_clinic: { 
    name: 'Basic Clinic', 
    price: 12999,
    compareAtPrice: 17999,
    description: 'Perfect for Individual Doctors & Small Clinics',
    features: [
      { id: 'hosp_landing', name: 'Premium Professional Landing Page', deductionValue: 3000 },
      { id: 'hosp_mobile', name: 'Mobile Responsive Design', deductionValue: 1000 },
      { id: 'hosp_services', name: 'Services & Treatments Section', deductionValue: 1500 },
      { id: 'hosp_gallery', name: 'Clinic Facility Gallery (15 Photos)', deductionValue: 1000 },
      { id: 'hosp_contact', name: 'Appointment Inquiry Form', deductionValue: 1000 },
      { id: 'hosp_maps', name: 'Google Maps Integration', deductionValue: 500 },
      { id: 'hosp_whatsapp', name: 'WhatsApp & Direct Call Button', deductionValue: 500 },
      { id: 'hosp_seo', name: 'Basic SEO Setup', deductionValue: 1000 },
      { id: 'hosp_speed', name: 'Speed Optimization', deductionValue: 1500 },
      { id: 'hosp_social', name: 'Social Media Links', deductionValue: 500 }
    ],
    freeServices: ['1 Month Free Maintenance', 'Free Logo Design', 'Upto 3 Digital Health Posters (PNG/JPEG)']
  },
  standard_hospital: { 
    name: 'Standard Hospital', 
    price: 17999,
    compareAtPrice: 23999,
    description: 'Best for Multi-specialty Clinics & Small Hospitals',
    features: [
      { id: 'hosp_std_pages', name: 'Multi-Page Website (5-7 Pages)', deductionValue: 4000 },
      { id: 'hosp_std_about', name: 'About Hospital / Doctor Profiles', deductionValue: 1000 },
      { id: 'hosp_std_reviews', name: 'Patient Reviews / Testimonials', deductionValue: 1000 },
      { id: 'hosp_std_facilities', name: 'Facilities & Wards Showcase', deductionValue: 1000 },
      { id: 'hosp_std_departments', name: 'Department Categories', deductionValue: 1000 },
      { id: 'hosp_std_gallery', name: 'Advanced Facility Gallery', deductionValue: 1500 },
      { id: 'hosp_std_seo', name: 'Better SEO (On-page + Technical)', deductionValue: 2000 },
      { id: 'hosp_std_whatsapp_order', name: 'WhatsApp Appointment Booking', deductionValue: 2000 },
      { id: 'hosp_std_analytics', name: 'Google Analytics Setup', deductionValue: 1000 },
      { id: 'hosp_std_perf', name: 'Performance Optimization', deductionValue: 1500 }
    ],
    freeServices: ['2 Months Free Maintenance', 'Free Logo Design', 'Upto 5 Digital Health Posters (PNG/JPEG)']
  },
  premium_hospital: { 
    name: 'Premium Hospital', 
    price: 24999,
    compareAtPrice: 34999,
    description: 'Complete Solution for Large Hospitals',
    features: [
      { id: 'hosp_prem_reserve', name: 'Online OPD Appointment System', deductionValue: 4000 },
      { id: 'hosp_prem_careers', name: 'Careers / Job Application Form', deductionValue: 2000 },
      { id: 'hosp_prem_doctors', name: 'Dynamic Doctors Directory', deductionValue: 3000 },
      { id: 'hosp_prem_admin', name: 'Admin Panel (Manage Bookings)', deductionValue: 3000 },
      { id: 'hosp_prem_seo', name: 'Advanced SEO (Schema + Local SEO)', deductionValue: 2500 },
      { id: 'hosp_prem_gsc', name: 'Google Search Console Setup', deductionValue: 1000 },
      { id: 'hosp_prem_chat', name: 'Live Chat / WhatsApp Chat', deductionValue: 1500 },
      { id: 'hosp_prem_events', name: 'Google Analytics + Conversion Events', deductionValue: 1500 },
      { id: 'hosp_prem_anim', name: 'Custom Trust-building Animations', deductionValue: 2000 },
      { id: 'hosp_prem_support', name: 'Priority Support', deductionValue: 2000 }
    ],
    freeServices: ['3 Months Free Maintenance', 'Free Logo Design', 'Upto 8 Digital Health Posters (PNG/JPEG)', 'Dedicated Account Manager']
  },
  enterprise_hospital: { 
    name: 'Enterprise Hospital', 
    price: 49999,
    compareAtPrice: 69999,
    description: 'State-of-the-Art Architecture for Major Hospitals',
    features: [
      { id: 'hosp_ent_booking', name: 'Advanced Multi-Doctor Appointment System', deductionValue: 8000 },
      { id: 'hosp_ent_portal', name: 'Patient Report / Lab Result Portal', deductionValue: 6000 },
      { id: 'hosp_ent_tele', name: 'Tele-consultation Video Integration', deductionValue: 5000 },
      { id: 'hosp_ent_admin', name: 'Comprehensive Hospital CRM / CMS', deductionValue: 8000 },
      { id: 'hosp_ent_payment', name: 'Online Payment Gateway setup', deductionValue: 3000 },
      { id: 'hosp_ent_seo', name: 'Enterprise SEO Strategy & Schema', deductionValue: 5000 },
      { id: 'hosp_ent_security', name: 'Advanced Data Security & HIPAA Config', deductionValue: 5000 },
      { id: 'hosp_ent_chat', name: 'AI WhatsApp Chatbot Integration', deductionValue: 4000 },
      { id: 'hosp_ent_perf', name: 'Ultra-Fast Enterprise CDN Optimization', deductionValue: 3000 },
      { id: 'hosp_ent_support', name: '24/7 VIP Technical Support', deductionValue: 2999 }
    ],
    freeServices: ['6 Months Free Maintenance', 'Premium Brand Identity Kit', 'Upto 15 Digital Health Posters (PNG/JPEG)', 'Dedicated VP Level Account Manager']
  }
};

export const ModularAddons: Record<AddonId, { name: string; price: number; description: string }> = {
  admin_panel: { name: 'Admin Panel / CMS', price: 5000, description: 'Manage content without coding' },
  online_ordering: { name: 'Online Ordering / Cart System', price: 8000, description: 'Take orders directly on your site' },
  table_reservation: { name: 'Table / Appointment Reservation', price: 3000, description: 'Streamline bookings and scheduling' },
  whatsapp_bot: { name: 'WhatsApp Bot Automation', price: 4000, description: 'Automate customer support and sales' },
  advanced_seo: { name: 'Advanced SEO Setup', price: 4500, description: 'Rank higher on Google searches' },
  payment_gateway: { name: 'Payment Gateway Integration', price: 2000, description: 'Accept online payments securely' },
  multi_language: { name: 'Multi-language Support', price: 3500, description: 'Reach a global audience' },
  live_chat: { name: 'Live Chat Integration', price: 1500, description: 'Engage visitors in real-time' },
  '1_month_maint': { name: '1 Month Extra Maintenance', price: 1000, description: 'Extended Priority Support & Minor Updates for 1 Month' },
  '3_month_maint': { name: '3 Months Extra Maintenance', price: 2500, description: 'Extended Priority Support & Minor Updates for 3 Months' },
  '6_month_maint': { name: '6 Months Extra Maintenance', price: 4500, description: 'Extended Priority Support & Minor Updates for 6 Months' }
};
