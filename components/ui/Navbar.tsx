'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { useActiveProduct } from '@/features/products/context/ProductContext';
import { Menu, X, Sparkles } from 'lucide-react';

export function Navbar() {
  const { activeProduct } = useActiveProduct();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'products', 'ingredients', 'benefits', 'reviews', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16 sm:h-20 px-5 sm:px-8 lg:px-12 xl:px-16 flex items-center ${
        isScrolled
          ? 'backdrop-blur-xl bg-black/75 border-b border-white/10 shadow-2xl'
          : 'backdrop-blur-md bg-black/35 border-b border-white/5'
      }`}
    >
      <div className="max-w-[1520px] mx-auto w-full flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="#home" className="flex items-center gap-2.5 group flex-shrink-0">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${activeProduct.theme.accent}, #ffffff)`,
              color: activeProduct.theme.accentText,
            }}
          >
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base tracking-wider text-white font-display">
              LUMINA
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-widest text-white/60 -mt-1 uppercase">
              Hair Atelier
            </span>
          </div>
        </Link>

        {/* Center Glass Navigation (Soda Pill Style) */}
        <nav className="hidden lg:flex items-center gap-1.5 glass px-2 py-1.5 rounded-full border border-white/20 flex-shrink-0 mx-4">
          {SITE_CONFIG.navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-nav text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'shadow-md font-bold'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: activeProduct.theme.accent,
                        color: activeProduct.theme.accentText,
                      }
                    : {}
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Contact CTA Button */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <a
            href="#contact"
            className="bg-black/50 hover:bg-black/80 text-white border border-white/15 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:border-white/30 shadow-lg whitespace-nowrap flex-shrink-0"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full glass text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-card border-b border-white/20 py-4 px-6 flex flex-col gap-3 lg:hidden animate-in slide-in-from-top-2 z-50">
          {SITE_CONFIG.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium py-2 text-white/80 hover:text-white border-b border-white/5"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-2.5 rounded-full text-xs font-bold"
            style={{
              backgroundColor: activeProduct.theme.accent,
              color: activeProduct.theme.accentText,
            }}
          >
            Contact Atelier
          </a>
        </div>
      )}
    </header>
  );
}
