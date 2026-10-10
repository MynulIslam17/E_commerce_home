'use client';

import React from 'react';
import Image from 'next/image';
import { useActiveProduct } from '../context/ProductContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function ProductCarouselCards() {
  const { products, activeId, switchProduct, prevProduct, nextProduct, activeProduct } =
    useActiveProduct();

  return (
    <div className="flex flex-col items-center lg:items-end gap-2.5 z-30 select-none">
      {/* Cards list */}
      <div className="flex items-end gap-3 pt-7">
        {products.map((p) => {
          const isActive = p.id === activeId;

          return (
            <button
              key={p.id}
              onClick={() => switchProduct(p.id)}
              className={`group relative text-center flex flex-col items-center px-2.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'border-2 scale-105 bg-white/20 backdrop-blur-xl shadow-2xl'
                  : 'border border-white/20 bg-white/10 hover:bg-white/15 hover:border-white/40 hover:-translate-y-1 backdrop-blur-lg'
              }`}
              style={{
                width: '114px',
                paddingTop: '46px',
                paddingBottom: '10px',
                borderColor: isActive ? activeProduct.theme.accent : 'rgba(255, 255, 255, 0.2)',
                boxShadow: isActive ? `0 12px 28px ${activeProduct.theme.accentGlow}` : undefined,
              }}
              aria-label={`Select ${p.name}`}
            >
              {/* Product floating thumbnail with explicit dimensions */}
              <div
                className="absolute -top-6 left-1/2 -translate-x-1/2 transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:-rotate-6 group-hover:scale-105 drop-shadow-[0_10px_18px_rgba(0,0,0,0.65)] pointer-events-none"
                style={{ width: '54px', height: '74px' }}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain"
                  sizes="60px"
                  priority
                />
              </div>

              {/* Card textual info */}
              <div className="flex flex-col w-full text-center">
                <span className="font-bold text-xs text-white tracking-tight truncate w-full block">
                  {p.shortName}
                </span>
                <span className="text-[10px] text-white/75 font-semibold block mt-0.5">
                  {p.price}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Nav Arrows */}
      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={prevProduct}
          className="w-7 h-7 rounded-full glass flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 transition-all hover:scale-110 border border-white/25 active:scale-95 shadow-md"
          aria-label="Previous product"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={nextProduct}
          className="w-7 h-7 rounded-full glass flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 transition-all hover:scale-110 border border-white/25 active:scale-95 shadow-md"
          aria-label="Next product"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
