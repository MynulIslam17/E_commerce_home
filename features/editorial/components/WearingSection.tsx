'use client';

import React from 'react';

export function WearingSection() {
  return (
    <section className="relative w-full py-28 sm:py-40 px-6 sm:px-12 lg:px-20 bg-[#070605] border-t border-white/10 flex items-center justify-center text-center select-none overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute w-[600px] h-[300px] rounded-full blur-[140px] bg-[#d97706]/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        <span className="kicker text-[#d97706] tracking-[0.22em] font-semibold">
          Stylist & Client Resonance
        </span>

        <blockquote className="font-serif italic text-2xl sm:text-4xl lg:text-5xl text-[#faf9f6] leading-tight font-normal">
          &ldquo;It feels like liquid sunlight on damaged strands — completely weightless, deeply restorative, and instantly luminous.&rdquo;
        </blockquote>

        <figcaption className="text-xs sm:text-sm font-sans tracking-widest uppercase text-white/50">
          <span className="text-white/80 font-bold">Helena Vane</span>, Editorial Master Stylist ·{' '}
          <cite className="not-italic text-white/40">Zürich & Paris Atelier</cite>
        </figcaption>
      </div>
    </section>
  );
}
