export type BasePackageId = 'landing_page' | 'standard_business' | 'ecommerce';
export type AddonId = 'admin_panel' | 'online_ordering' | 'table_reservation' | 'whatsapp_bot' | 'advanced_seo' | 'payment_gateway' | 'multi_language' | 'live_chat';

export type SubFeature = {
  id: string;
  name: string;
  deductionValue: number;
};

export type BasePackageConfig = {
  name: string;
  price: number;
  description: string;
  features: SubFeature[];
};

export const BasePackages: Record<BasePackageId, BasePackageConfig> = {
  landing_page: { 
    name: 'Landing Page / Single Page', 
    price: 8000, 
    description: 'High-converting single page website',
    features: [
      { id: 'lp_design', name: 'Premium UI/UX Design', deductionValue: 3000 },
      { id: 'lp_copy', name: 'Copywriting Assistance', deductionValue: 1500 },
      { id: 'lp_contact', name: 'Lead Capture Form', deductionValue: 1000 },
      { id: 'lp_hosting', name: '1 Year Free Hosting', deductionValue: 2000 }
    ]
  },
  standard_business: { 
    name: 'Standard Business (5 Pages)', 
    price: 15000, 
    description: 'Complete corporate presence',
    features: [
      { id: 'std_pages', name: '5 Core Pages (Home, About...)', deductionValue: 4000 },
      { id: 'std_seo', name: 'Basic On-page SEO', deductionValue: 2000 },
      { id: 'std_contact', name: 'Advanced Contact Form', deductionValue: 1500 },
      { id: 'std_gallery', name: 'Dynamic Portfolio/Gallery', deductionValue: 2000 },
      { id: 'std_hosting', name: '1 Yr Free Hosting + Domain', deductionValue: 3000 }
    ]
  },
  ecommerce: { 
    name: 'E-Commerce / Advanced App', 
    price: 25000, 
    description: 'Full digital storefront and catalog',
    features: [
      { id: 'ecom_catalog', name: 'Product Catalog (Up to 50)', deductionValue: 5000 },
      { id: 'ecom_cart', name: 'Cart & Checkout Flow', deductionValue: 4000 },
      { id: 'ecom_payment', name: 'Basic Payment Setup', deductionValue: 2000 },
      { id: 'ecom_user', name: 'User Auth & Profiles', deductionValue: 3000 },
      { id: 'ecom_hosting', name: 'Premium Cloud Hosting', deductionValue: 4000 }
    ]
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
  live_chat: { name: 'Live Chat Integration', price: 1500, description: 'Engage visitors in real-time' }
};
