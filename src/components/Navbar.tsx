'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin') || pathname.startsWith('/consultation')) {
    return null;
  }

  return (
    <nav className={`fixed w-full z-50 glass-panel transition-all duration-300 ${isScrolled ? 'py-2 shadow-lg' : 'py-4'}`} id="navbar">
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold flex items-center gap-2">
          <i className="fa-solid fa-code text-primary"></i> DevZilla
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <Link href="/#home" className="hover:text-white transition">Home</Link>
          <Link href="/portfolio" className="hover:text-primary transition">Portfolio</Link>
          <Link href="/#pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/#features" className="hover:text-white transition">Features</Link>
        </div>
        
        <Link href="https://wa.me/919244161034" className="hidden md:inline-block bg-gradient-primary px-6 py-2 rounded-full font-medium text-sm hover:glow transition">
          Get A Free Quote <i className="fa-solid fa-arrow-right ml-1"></i>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-panel border-t border-gray-800 shadow-xl flex flex-col py-4 px-6 space-y-4">
          <Link href="/#home" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white font-medium mobile-link">Home</Link>
          <Link href="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white font-medium mobile-link">Portfolio</Link>
          <Link href="/#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white font-medium mobile-link">Pricing</Link>
          <Link href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white font-medium mobile-link">Features</Link>
          <Link href="https://wa.me/919244161034" onClick={() => setIsMobileMenuOpen(false)} className="bg-gradient-primary px-6 py-2 rounded-full font-medium text-sm text-center mobile-link mt-2">Get A Free Quote</Link>
        </div>
      )}
    </nav>
  );
}
