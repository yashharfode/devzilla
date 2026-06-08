export type BasePackageId = 'landing_page' | 'standard_business' | 'ecommerce';
export type AddonId = 'admin_panel' | 'online_ordering' | 'table_reservation' | 'whatsapp_bot' | 'advanced_seo' | 'payment_gateway' | 'multi_language' | 'live_chat';

export const BasePackages: Record<BasePackageId, { name: string; price: number; description: string }> = {
  landing_page: { name: 'Landing Page / Single Page', price: 8000, description: 'High-converting single page website' },
  standard_business: { name: 'Standard Business (5 Pages)', price: 15000, description: 'Complete corporate presence' },
  ecommerce: { name: 'E-Commerce / Advanced App', price: 25000, description: 'Full digital storefront and catalog' }
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
