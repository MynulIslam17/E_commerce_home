'use client';

import React from 'react';
import { useActiveProduct } from '@/features/products/context/ProductContext';
import { ProductHeroCenter } from '@/features/products/components/ProductHeroCenter';
import { ProductFloatingElements } from '@/features/products/components/ProductFloatingElements';
import { ProductCarouselCards } from '@/features/products/components/ProductCarouselCards';
import { Award, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  const { activeProduct } = useActiveProduct();

  return (
    <section
      id="home"
      className="relative w-full min-h-screen lg:h-[100dvh] lg:min-h-[720px] lg:max-h-[1000px] flex flex-col justify-between px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
      style={{ paddingTop: '136px', paddingBottom: '32px' }}
    >
      {/* Floating Ambient Particles & Repulsion */}
      <ProductFloatingElements />

      {/* Desktop Composition (>= 1024px) */}
      <div
        className="hidden lg:flex w-full justify-between items-stretch relative z-20 pointer-events-none"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          height: 'calc(100vh - 180px)',
          minHeight: '560px',
          maxHeight: '800px',
        }}
      >
        {/* Centered Floating Product Bottle (2.5D Tilt Tracking) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <ProductHeroCenter />
        </div>

        {/* Left Column: Cursive Title, Description, CTA, Award Badge */}
        <div className="w-[320px] xl:w-[380px] flex flex-col justify-between items-start pointer-events-auto z-30 py-3">
          <div className="space-y-4 pt-6 sm:pt-8">
            <h1 className="hero-cursive-title transition-all duration-700">
              <span className="outline-title block leading-none">{activeProduct.heroHeadline.leftLine1}</span>
              <span className="text-white drop-shadow-xl block leading-none mt-1 sm:mt-2">{activeProduct.heroHeadline.leftLine2}</span>
            </h1>

            <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-[320px] font-normal backdrop-blur-[2px] pt-1">
              {activeProduct.description}
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href="#products"
                className="group flex items-center gap-4 bg-black/60 hover:bg-black/85 text-white pl-5 pr-2 py-1.5 rounded-full border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-white/40 shadow-xl"
              >
                <span className="font-bold text-xs tracking-wide">Explore Formula</span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center font-black text-base transition-transform duration-300 group-hover:rotate-90 group-hover:scale-105 shadow-md"
                  style={{
                    backgroundColor: activeProduct.theme.accent,
                    color: activeProduct.theme.accentText,
                  }}
                >
                  +
                </span>
              </a>

              <a
                href="#ingredients"
                className="text-xs font-semibold text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all"
              >
                View Actives
              </a>
            </div>
          </div>

          {/* Award Badge at Bottom Left */}
          <div className="flex items-center gap-3 pt-4 mt-auto">
            <div className="w-10 h-10 rounded-2xl glass flex items-center justify-center border border-white/20 text-white shadow-lg flex-shrink-0">
              <Award className="w-5 h-5 text-yellow-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] tracking-[0.16em] uppercase text-white/60 font-semibold font-nav">
                {activeProduct.awardBadge.title}
              </span>
              <span className="text-xs font-bold text-white tracking-wide">
                {activeProduct.awardBadge.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Carousel Cards & Side Cursive Title */}
        <div className="w-[320px] xl:w-[380px] flex flex-col justify-between items-end text-right pointer-events-auto z-30 py-3">
          {/* Top: Carousel Cards */}
          <div className="pointer-events-auto">
            <ProductCarouselCards />
          </div>

          {/* Bottom: Side Cursive Title & Tagline */}
          <div className="flex flex-col items-end mt-auto pb-1">
            <h2 className="hero-cursive-side transition-all duration-700">
              <span className="outline-title block leading-none">{activeProduct.heroHeadline.rightLine1}</span>
              <span className="text-white drop-shadow-xl block leading-none mt-1 sm:mt-2">{activeProduct.heroHeadline.rightLine2}</span>
            </h2>
            <div className="flex items-center gap-1.5 mt-2 text-white/70 text-[11px] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{activeProduct.tagline}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Flow (< 1024px) */}
      <div className="flex lg:hidden flex-col items-center text-center w-full max-w-lg mx-auto relative z-20 space-y-6 pt-2 pb-8">
        {/* Title & Copy */}
        <div className="space-y-3 px-4 w-full">
          <h1 className="hero-cursive-title transition-all duration-700">
            <span className="outline-title mr-2">{activeProduct.heroHeadline.leftLine1}</span>
            <span className="text-white drop-shadow-xl">{activeProduct.heroHeadline.leftLine2}</span>
          </h1>

          <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-[330px] mx-auto font-normal">
            {activeProduct.description}
          </p>

          <div className="pt-2 flex items-center justify-center gap-4">
            <a
              href="#products"
              className="group inline-flex items-center gap-3 bg-black/60 hover:bg-black/85 text-white pl-5 pr-2 py-2 rounded-full border border-white/20 transition-all shadow-xl"
            >
              <span className="font-bold text-xs tracking-wide">Explore Formula</span>
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center font-black text-base shadow-md"
                style={{
                  backgroundColor: activeProduct.theme.accent,
                  color: activeProduct.theme.accentText,
                }}
              >
                +
              </span>
            </a>
            <a
              href="#ingredients"
              className="text-xs font-semibold text-white/70 hover:text-white underline underline-offset-4"
            >
              View Actives
            </a>
          </div>
        </div>

        {/* Responsive Bottle */}
        <div className="relative w-full h-[280px] sm:h-[340px] flex items-center justify-center my-2">
          <ProductHeroCenter />
        </div>

        {/* Switcher Cards */}
        <div className="w-full flex justify-center py-2 z-30">
          <ProductCarouselCards />
        </div>

        {/* Award Badge */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="w-9 h-9 rounded-xl glass flex items-center justify-center border border-white/20 text-white shadow-md flex-shrink-0">
            <Award className="w-4 h-4 text-yellow-300" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[9px] tracking-[0.16em] uppercase text-white/60 font-semibold font-nav">
              {activeProduct.awardBadge.title}
            </span>
            <span className="text-xs font-bold text-white tracking-wide">
              {activeProduct.awardBadge.subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* Down Scroll Prompt (Desktop only) */}
      <a
        href="#products"
        className="hidden lg:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1 text-white/40 hover:text-white transition-colors"
        aria-label="Scroll to products"
      >
        <span className="text-[9px] uppercase tracking-widest font-semibold">Scroll</span>
        <div className="w-3.5 h-6 rounded-full border border-white/30 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 bg-white/70 rounded-full animate-bounce" />
        </div>
      </a>
    </section>
  );
}
