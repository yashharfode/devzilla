'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin') || pathname.startsWith('/c')) return null;

  return (
    <footer className="bg-card border-t border-gray-800 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white mb-6 inline-block font-heading">
              DEV<span className="text-primary">ZILLA</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We build premium, high-converting digital experiences that help businesses scale their online revenue.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Visit our Facebook page" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition text-gray-300 hover:text-white"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="Visit our Twitter page" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition text-gray-300 hover:text-white"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" aria-label="Visit our LinkedIn page" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition text-gray-300 hover:text-white"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" aria-label="Visit our Instagram page" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition text-gray-300 hover:text-white"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/#home" className="hover:text-primary transition">Home</Link></li>
              <li><Link href="/#features" className="hover:text-primary transition">About Us</Link></li>
              <li><Link href="/#features" className="hover:text-primary transition">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition">Portfolio</Link></li>
              <li><Link href="/#pricing" className="hover:text-primary transition">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-primary transition">Website Design</a></li>
              <li><a href="#" className="hover:text-primary transition">E-Commerce Websites</a></li>
              <li><Link href="/seo" className="hover:text-primary transition">SEO Optimization</Link></li>
              <li><a href="#" className="hover:text-primary transition">Restaurant Websites</a></li>
              <li><a href="#" className="hover:text-primary transition">Maintenance & Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="tel:+919244161034" className="flex items-center gap-3 text-white hover:text-primary transition"><div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-primary"><i className="fa-solid fa-phone"></i></div> Call Now</a></li>
              <li><a href="https://wa.me/919244161034" className="flex items-center gap-3 text-white hover:text-green-500 transition"><div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-green-500"><i className="fa-brands fa-whatsapp"></i></div> WhatsApp</a></li>
              <li><a href="mailto:info@devzilla.com" className="flex items-center gap-3 text-white hover:text-blue-400 transition"><div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-blue-400"><i className="fa-solid fa-envelope"></i></div> Email</a></li>
            </ul>
            <a href="https://wa.me/919244161034" className="inline-block mt-6 px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-dark transition text-sm font-bold">Book a Free Consultation</a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2026 DevZilla. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
