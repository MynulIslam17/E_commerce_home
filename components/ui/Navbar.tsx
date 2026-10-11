'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Elixir', href: '#showcase' },
    { label: 'The Notes', href: '#showcase' },
    { label: 'Atelier', href: '#atelier' },
    { label: 'Formula', href: '#formula' },
    { label: 'Collection', href: '#collection' },
    { label: 'Stockists', href: '#stockists' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16 sm:h-20 px-6 sm:px-12 lg:px-16 flex items-center ${
          isScrolled
            ? 'backdrop-blur-xl bg-black/80 border-b border-white/10 shadow-2xl'
            : 'backdrop-blur-md bg-black/40 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          {/* Left: Menu Drawer Toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2.5 text-xs sm:text-sm font-sans tracking-wider uppercase text-white/80 hover:text-white transition-colors group cursor-pointer"
            aria-label="Open navigation menu"
          >
            <span className="w-5 flex flex-col gap-1 items-start group-hover:gap-1.5 transition-all">
              <span className="w-4 h-[1.5px] bg-white group-hover:w-5 transition-all" />
              <span className="w-5 h-[1.5px] bg-white" />
            </span>
            <span className="font-medium hidden sm:inline">Menu</span>
          </button>

          {/* Center: Brand Wordmark */}
          <Link href="#showcase" className="flex flex-col items-center group">
            <span className="font-serif text-xl sm:text-2xl tracking-[0.14em] text-white font-bold group-hover:text-[#f59e0b] transition-colors">
              LUMINA
            </span>
            <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.24em] text-white/50 uppercase -mt-0.5">
              VERA · ZÜRICH
            </span>
          </Link>

          {/* Right: Bag / Acquire Flacon */}
          <Link
            href="#collection"
            className="flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-sans font-medium tracking-wide transition-all border border-white/15 hover:border-white/30"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Bag</span>
            <span className="text-white/50 text-[10px] sm:text-xs">(0)</span>
          </Link>
        </div>
      </header>

      {/* Luxury Fullscreen Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c0a09]/95 backdrop-blur-3xl flex flex-col justify-between p-8 sm:p-16 lg:p-20 animate-in fade-in duration-300">
          <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
            <span className="kicker text-[#d97706] tracking-[0.2em] font-semibold">
              Lumina Hair Atelier
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="max-w-7xl mx-auto w-full my-auto py-12">
            <ol className="space-y-4 sm:space-y-6">
              {navLinks.map((link, idx) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 sm:gap-8 text-3xl sm:text-5xl lg:text-6xl font-serif text-white/80 hover:text-white transition-all"
                  >
                    <span className="font-mono text-sm sm:text-xl text-[#f59e0b]/70 group-hover:text-[#f59e0b]">
                      0{idx + 1}
                    </span>
                    <span className="group-hover:translate-x-3 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-white/40 pt-6 border-t border-white/10 gap-2">
            <span>Atelier Limmatquai 18, 8001 Zürich · Open Tuesday to Saturday</span>
            <span>Micro-Batch Bottling No. 300</span>
          </div>
        </div>
      )}
    </>
  );
}
