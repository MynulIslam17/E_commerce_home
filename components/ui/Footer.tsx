'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { Sparkles } from 'lucide-react';
import { useActiveProduct } from '@/features/products/context/ProductContext';

export function Footer() {
  const { activeProduct } = useActiveProduct();

  return (
    <footer className="relative w-full border-t border-white/10 bg-black/60 backdrop-blur-xl py-12 px-5 sm:px-8 md:px-12 lg:px-16 z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: activeProduct.theme.accent,
                color: activeProduct.theme.accentText,
              }}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg font-display tracking-wider text-white">LUMINA</span>
          </div>
          <p className="text-white/50 text-xs mt-2 max-w-sm">
            Showcasing high-performance hair care formulations with authentic visual fidelity and interactive presentation.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
          {SITE_CONFIG.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Packaging Integrity Notice & Copyright */}
        <div className="flex flex-col items-center md:items-end text-xs text-white/50 space-y-1 text-center md:text-right">
          <p className="text-[11px] text-white/40">
            Featuring authentic packaging details from Sunsilk & Parachute Advansed.
          </p>
          <p>© 2025 LUMINA Hair Atelier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
