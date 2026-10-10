'use client';

import React from 'react';
import Image from 'next/image';
import { useActiveProduct } from '@/features/products/context/ProductContext';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export function ProductsSection() {
  const { products, activeId, switchProduct } = useActiveProduct();

  return (
    <section id="products" className="relative w-full py-28 px-5 sm:px-8 md:px-12 lg:px-16 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/15 text-xs font-semibold tracking-wider uppercase text-white/80">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Curated Hair Care Formulations
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Dual Botanical & Salon Formulations
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Formulated to address distinct hair needs: instant thermal repair and glass shine with Sunsilk Super Serum, and deep cellular hydration with Parachute Aloe Vera Enriched Coconut Oil.
          </p>
        </div>

        {/* Dual Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {products.map((product) => {
            const isCurrent = product.id === activeId;

            return (
              <div
                key={product.id}
                onClick={() => switchProduct(product.id)}
                className={`relative rounded-3xl p-6 sm:p-8 lg:p-9 transition-all duration-500 cursor-pointer overflow-hidden group flex flex-col justify-between ${
                  isCurrent
                    ? 'glass border-2 shadow-2xl'
                    : 'glass-card hover:border-white/30 hover:-translate-y-1.5'
                }`}
                style={{
                  borderColor: isCurrent ? product.theme.accent : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: isCurrent ? `0 20px 60px ${product.theme.accentGlow}` : undefined,
                }}
              >
                {/* Header: Brand & Active Badge */}
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                  <span className="text-xs uppercase tracking-widest text-white/60 font-semibold font-nav truncate">
                    {product.brand} • {product.category}
                  </span>
                  {isCurrent && (
                    <div
                      className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 flex-shrink-0"
                      style={{
                        backgroundColor: product.theme.accent,
                        color: product.theme.accentText,
                      }}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                      Active In Hero
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8 flex-1">
                  {/* Bottle Visual Showcase */}
                  <div className="relative w-36 sm:w-44 h-64 sm:h-72 flex-shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2 drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 160px, 200px"
                      className="object-contain"
                    />
                  </div>

                  {/* Product Details & Specifications */}
                  <div className="flex flex-col justify-between text-left w-full min-w-0 flex-1 h-full">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-3 mt-2 mb-3">
                        <span className="text-2xl font-extrabold text-white font-display">
                          {product.price}
                        </span>
                        <span className="text-xs text-white/60 border border-white/20 px-2.5 py-0.5 rounded-full font-medium">
                          {product.volume}
                        </span>
                      </div>

                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Packaging Claims Specs Sheet */}
                    <div className="bg-black/35 rounded-2xl p-4 border border-white/10 space-y-2 mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1 sm:gap-2">
                        <span className="text-white/45 uppercase tracking-wider text-[10px] font-medium">Active Complex</span>
                        <span className="font-semibold text-white/95 text-left sm:text-right">{product.packagingSpecs.actives}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1 sm:gap-2 pt-1.5 border-t border-white/5">
                        <span className="text-white/45 uppercase tracking-wider text-[10px] font-medium">Hair Profile</span>
                        <span className="font-semibold text-white/95 text-left sm:text-right">{product.packagingSpecs.suitableFor}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1 sm:gap-2 pt-1.5 border-t border-white/5">
                        <span className="text-white/45 uppercase tracking-wider text-[10px] font-medium">Finish</span>
                        <span className="font-semibold text-white/95 text-left sm:text-right">{product.packagingSpecs.formulaType}</span>
                      </div>
                    </div>

                    {/* Action Button Container */}
                    <div className="pt-1 mt-auto">
                      <button
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 shadow-xl"
                        style={{
                          backgroundColor: isCurrent ? product.theme.accent : 'rgba(255, 255, 255, 0.12)',
                          color: isCurrent ? product.theme.accentText : '#ffffff',
                        }}
                      >
                        <span>{isCurrent ? 'Viewing in Showcase' : 'Preview In Hero Experience'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
