'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#070605] py-20 px-6 sm:px-12 lg:px-20 z-20 select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Giant Atelier Brand Watermark */}
        <div className="border-b border-white/10 pb-10">
          <span className="font-serif text-5xl sm:text-7xl lg:text-9xl text-white/[0.08] block tracking-[0.16em] uppercase font-bold">
            LUMINA
          </span>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-xs">
          {/* Col 1: Atelier */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold tracking-widest uppercase text-white/40">
              The Atelier
            </h3>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <Link href="#atelier" className="hover:text-white transition-colors">
                  Atelier Zürich
                </Link>
              </li>
              <li>
                <Link href="#formula" className="hover:text-white transition-colors">
                  Bio-Cellular Formulation
                </Link>
              </li>
              <li>
                <Link href="#stockists" className="hover:text-white transition-colors">
                  Selected Stockists
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Care & Refills */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold tracking-widest uppercase text-white/40">
              Care & Refills
            </h3>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <Link href="#collection" className="hover:text-white transition-colors">
                  Flacon Refills
                </Link>
              </li>
              <li>
                <Link href="#collection" className="hover:text-white transition-colors">
                  Global Courier Delivery
                </Link>
              </li>
              <li>
                <a href="mailto:concierge@luminahair.ch" className="hover:text-white transition-colors">
                  concierge@luminahair.ch
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Specifications */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold tracking-widest uppercase text-white/40">
              Micro-Batch Specs
            </h3>
            <p className="text-white/60 leading-relaxed font-sans">
              Batch No. 300 poured at Atelier Limmatquai. Formulated without synthetic sulfates, phthalates, parabens, or mineral oils.
            </p>
          </div>

          {/* Col 4: Batch Letters Newsletter */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold tracking-widest uppercase text-white/40">
              Batch Letters
            </h3>
            <p className="text-white/60 leading-relaxed font-sans">
              One email when a micro-batch is poured. Nothing else.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
              <input
                type="email"
                placeholder="your.email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 px-3.5 py-2.5 rounded-full text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-full bg-[#f59e0b] hover:bg-[#fbbf24] text-[#141412] font-bold text-xs transition-transform hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                {subscribed ? 'Joined' : 'Join'}
              </button>
            </form>
          </div>
        </div>

        {/* Legal & Location */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-4">
          <p>© 2026 LUMINA Hair Atelier AG · Zürich, Switzerland</p>
          <p>Extrait de parfum & bio-cellular hair formulations</p>
        </div>
      </div>
    </footer>
  );
}
