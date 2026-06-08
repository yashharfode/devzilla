export type BasePackageId = 'basic_bhojnalaya' | 'standard_restaurant' | 'premium_restaurant';
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
