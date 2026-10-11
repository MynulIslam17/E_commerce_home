'use client';

import React from 'react';
import Image from 'next/image';
import { SHOWCASE_CONFIG } from '@/features/showcase/config/showcaseConfig';
import { Sparkles, Award } from 'lucide-react';

export function AtelierSection() {
  const { specs } = SHOWCASE_CONFIG;

  return (
    <section
      id="atelier"
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 lg:px-20 bg-[#0c0a09] border-t border-white/10 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Left Side: Atelier Visual Artwork */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden glass-card border border-white/15 shadow-2xl">
            <Image
              src="/images/products/vera_source.jpg"
              alt="Lumina Atelier VERA serum presentation"
              fill
              className="object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Ambient amber glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/80 text-xs">
              <span className="font-sans">Precision Pipette Formulation</span>
              <span className="font-mono text-[#f59e0b]">Zürich Laboratory</span>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Prose & Figures */}
        <div className="w-full lg:w-1/2 flex flex-col items-start space-y-6">
          <span className="kicker text-[#d97706] tracking-[0.2em] font-semibold">
            The Atelier
          </span>

          <h2 className="stage-h2 text-white font-serif tracking-tight leading-tight">
            Three chemists, one bench and a window onto the <em>Limmat</em>.
          </h2>

          <p className="text-white/75 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
            Lumina was founded in Zürich as an artisanal restorative studio by chemists trained in botanical lipid extraction. We reject mass warehouse industrial lines: every flacon of VERA is cold-blended, filtered, and sealed by hand in strictly limited batches of 300.
          </p>

          {/* Key Figures Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-white/10">
            {specs.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-white/45 text-[10px] sm:text-xs uppercase tracking-wider font-semibold font-sans">
                  {item.label}
                </span>
                <span className="text-lg sm:text-2xl font-bold font-serif text-[#f59e0b] mt-1">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
