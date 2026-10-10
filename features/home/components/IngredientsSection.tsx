'use client';

import React from 'react';
import Image from 'next/image';
import { useActiveProduct } from '@/features/products/context/ProductContext';
import { Sparkles, Leaf } from 'lucide-react';

export function IngredientsSection() {
  const { activeProduct, switchProduct, products, activeId } = useActiveProduct();

  return (
    <section id="ingredients" className="relative w-full py-28 px-5 sm:px-8 md:px-12 lg:px-16 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/15 text-xs font-semibold tracking-wider uppercase text-white/80">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              Active Biochemical Profiles
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
              The Science of Ingredients
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Every drop is backed by authentic, clinically respected botanical and peptide actives directly derived from the official product formulations.
            </p>
          </div>

          {/* Toggle pill buttons with guaranteed no-wrap and spacing */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 glass p-1.5 rounded-2xl sm:rounded-full border border-white/15 flex-col sm:flex-row w-full sm:w-auto self-start md:self-end flex-shrink-0">
            {products.map((p) => {
              const isSelected = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => switchProduct(p.id)}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-xl sm:rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0 text-center ${
                    isSelected ? 'shadow-md font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: p.theme.accent,
                          color: p.theme.accentText,
                        }
                      : {}
                  }
                >
                  {p.brand} Actives
                </button>
              );
            })}
          </div>
        </div>

        {/* Ingredients Grid with consistent min-h and generous padding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {activeProduct.keyIngredients.map((item, idx) => (
            <div
              key={item.name}
              className="glass-card rounded-3xl p-7 sm:p-8 lg:p-9 border border-white/15 flex flex-col justify-between hover:border-white/35 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group min-h-[420px]"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: activeProduct.theme.accent }}
              />

              <div className="flex flex-col flex-1">
                {/* Number Badge */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-md mb-6 flex-shrink-0"
                  style={{
                    backgroundColor: activeProduct.theme.badgeBg,
                    color: activeProduct.theme.accent,
                    border: `1px solid ${activeProduct.theme.badgeBorder}`,
                  }}
                >
                  0{idx + 1}
                </div>

                <div className="mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50 block mb-1">
                    {item.concentration}
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mb-2 leading-snug">
                    {item.name}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>{item.role}</span>
                  </div>
                </div>

                <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                  {item.details}
                </p>
              </div>

              {/* Cleanly padded footer with dedicated margin */}
              <div className="pt-4 pb-1 border-t border-white/10 flex items-center justify-between text-xs text-white/50 mt-auto">
                <span>Formula Origin</span>
                <span className="text-white font-semibold">{activeProduct.brand}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Callout Bar with proper flex and responsive padding */}
        <div className="mt-14 glass rounded-3xl p-6 sm:p-8 lg:p-9 border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass flex items-center justify-center flex-shrink-0 border border-white/15 shadow-md">
              <Image
                src={
                  activeProduct.id === 'sunsilk'
                    ? '/images/ingredients/golden_drop.png'
                    : '/images/ingredients/aloe_leaf.png'
                }
                alt="Active Ingredient"
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-base sm:text-lg font-bold text-white font-display">
                {activeProduct.id === 'sunsilk'
                  ? 'Zero Sticky Residue • High Thermal Resistance'
                  : 'Zero Heaviness • 100% Cold-Pressed Coconut Lipids'}
              </h4>
              <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                {activeProduct.id === 'sunsilk'
                  ? 'Peptide-chains remain stable and active even during high-temperature styling.'
                  : 'Aloe vera delivers hydration molecules that bind deeply with porous hair fibers.'}
              </p>
            </div>
          </div>

          <a
            href="#benefits"
            className="px-7 py-3 rounded-full text-xs font-bold transition-all shadow-xl flex-shrink-0 whitespace-nowrap self-stretch md:self-auto text-center"
            style={{
              backgroundColor: activeProduct.theme.accent,
              color: activeProduct.theme.accentText,
            }}
          >
            Explore Benefits Matrix
          </a>
        </div>
      </div>
    </section>
  );
}
