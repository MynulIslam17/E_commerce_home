'use client';

import React from 'react';
import { SHOWCASE_CONFIG } from '@/features/showcase/config/showcaseConfig';
import { Leaf, Droplets, ShieldCheck } from 'lucide-react';

export function FormulaSection() {
  const { formulaRows } = SHOWCASE_CONFIG;

  const ICONS = {
    Top: Droplets,
    Heart: Leaf,
    Base: ShieldCheck,
  };

  return (
    <section
      id="formula"
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 lg:px-20 bg-[#090807] border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16 sm:mb-20 space-y-4">
          <span className="kicker text-[#d97706] tracking-[0.2em] font-semibold">
            Biochemical Formula
          </span>
          <h2 className="stage-h2 text-white font-serif tracking-tight leading-tight">
            What is in the bottle, and <em>where it grows</em>.
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed font-sans">
            Transparent active composition. Every botanical active is ethically cultivated, solvent-free extracted, and verified for bio-availability.
          </p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {formulaRows.map((row) => {
            const Icon = ICONS[row.tier] || Leaf;

            return (
              <div
                key={row.tier}
                className="py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors px-2 sm:px-4 rounded-xl"
              >
                {/* Left: Tier badge & Name */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#f59e0b] flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#f59e0b] font-bold block mb-1">
                      {row.tier} Phase · {row.percentage}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif text-white tracking-wide">
                      {row.name}
                    </h3>
                  </div>
                </div>

                {/* Right: Geographical Origin */}
                <div className="md:text-right text-xs sm:text-sm font-sans text-white/50 pl-14 md:pl-0">
                  <span className="block text-white/30 text-[10px] uppercase tracking-wider mb-0.5">
                    Botanical Origin
                  </span>
                  <span className="text-white/80 font-medium">{row.origin}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
