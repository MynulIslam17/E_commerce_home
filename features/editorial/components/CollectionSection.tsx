'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SHOWCASE_CONFIG, BottleSizeOption } from '@/features/showcase/config/showcaseConfig';
import { Check, ShoppingBag, ShieldCheck, RefreshCw } from 'lucide-react';

export function CollectionSection() {
  const { product, sizes } = SHOWCASE_CONFIG;
  const [selectedSize, setSelectedSize] = useState<BottleSizeOption>(sizes[1]); // Default 100ml
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <section
      id="collection"
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 lg:px-20 bg-[#0a0807] border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Left Side: Visual Product Silhouette & Presentation */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <div className="relative w-64 sm:w-80 h-96 sm:h-[480px] flex items-center justify-center">
            {/* Glow halo */}
            <div className="absolute inset-0 bg-[#f59e0b]/20 rounded-full blur-[90px] pointer-events-none" />

            <div
              className="relative w-full h-full rounded-3xl overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out"
              style={{ transform: `scale(${selectedSize.scale})` }}
            >
              <Image
                src="/images/products/vera_source.jpg"
                alt="VERA Hydra Serum Flacon"
                fill
                className="object-cover filter contrast-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-white">
                <span className="uppercase tracking-widest text-[#f59e0b] font-semibold">{selectedSize.volume}</span>
                <span className="font-mono text-white/70">Atelier Flacon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Product Purchase Suite */}
        <form onSubmit={handleAdd} className="w-full lg:w-1/2 flex flex-col items-start space-y-6">
          <span className="kicker text-[#d97706] tracking-[0.2em] font-semibold">
            Atelier Collection
          </span>

          <h2 className="stage-h2 text-white font-serif tracking-tight leading-tight">
            {product.name} Hydra Serum, <em>cellular elixir</em>
          </h2>

          <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed max-w-lg">
            Numbered micro-batch of 300. Poured in heavy-walled pharmaceutical amber glass to protect active plant lipids against UV photodegradation.
          </p>

          {/* Bottle Size Selector Radios */}
          <fieldset className="w-full space-y-3 pt-2">
            <legend className="sr-only">Choose Flacon Size</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              {sizes.map((s) => {
                const isSelected = s.id === selectedSize.id;

                return (
                  <label
                    key={s.id}
                    onClick={() => setSelectedSize(s)}
                    className={`relative p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white/15 border-[#f59e0b] shadow-[0_10px_25px_rgba(245,158,11,0.25)]'
                        : 'bg-white/5 border-white/15 hover:border-white/30 hover:bg-white/[0.08]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="flacon_size"
                      value={s.id}
                      checked={isSelected}
                      onChange={() => setSelectedSize(s)}
                      className="sr-only"
                    />

                    {s.popular && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#f59e0b] text-[#141412] font-mono text-[9px] font-bold uppercase tracking-wider">
                        Most Loved
                      </span>
                    )}

                    <span className="text-lg font-serif font-bold text-white block">
                      {s.volume}
                    </span>
                    <span className="text-xs text-white/50 block mt-0.5 font-sans">
                      {s.title}
                    </span>
                    <span className="text-sm font-bold text-[#f59e0b] mt-3 block font-mono">
                      ${s.price}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Price & Buy Action */}
          <div className="pt-4 flex items-center gap-6 w-full">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">
                Investment
              </span>
              <span className="text-3xl sm:text-4xl font-serif text-white font-bold tracking-tight">
                ${selectedSize.price}
              </span>
            </div>

            <button
              type="submit"
              className={`flex-1 py-4 px-8 rounded-full font-sans text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2 ${
                added
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#f59e0b] hover:bg-[#fbbf24] text-[#141412] hover:scale-[1.02]'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Atelier Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire Flacon ({selectedSize.volume})</span>
                </>
              )}
            </button>
          </div>

          {/* Guarantees */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Complimentary Refills at Atelier</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Free Express Courier Worldwide</span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
