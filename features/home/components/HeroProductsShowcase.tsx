'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useActiveProduct } from '@/features/products/context/ProductContext';
import { ProductFloatingElements } from '@/features/products/components/ProductFloatingElements';
import { ProductCarouselCards } from '@/features/products/components/ProductCarouselCards';
import { Award, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  (window as any).gsap = gsap;
  (window as any).ScrollTrigger = ScrollTrigger;
}

export function HeroProductsShowcase() {
  const { activeProduct, activeId, switchProduct, setIsSwitching } = useActiveProduct();

  // Root and section refs
  const showcaseRef = useRef<HTMLDivElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);
  const productsStageRef = useRef<HTMLDivElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const heroCenterSlotRef = useRef<HTMLDivElement>(null);

  // Traveling bottle refs
  const travelingBottleRef = useRef<HTMLDivElement>(null);
  const bottleVisualRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Card slot refs
  const cardSlotRefs = useRef<Record<string, HTMLDivElement | null>>({
    sunsilk: null,
    parachute: null,
  });
  const cardContainerRefs = useRef<Record<string, HTMLDivElement | null>>({
    sunsilk: null,
    parachute: null,
  });

  // State
  const [displayProduct, setDisplayProduct] = useState(activeProduct);
  const previousIdRef = useRef(activeProduct.id);
  const isSpinningRef = useRef(false);
  const scrollProgressRef = useRef(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Sync displayProduct
  useEffect(() => {
    if (!isSpinningRef.current) {
      setDisplayProduct(activeProduct);
    }
  }, [activeProduct]);

  // Mouse 2.5D tilt tracking in Hero (blends out smoothly as user scrolls)
  useEffect(() => {
    const mouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animateTilt = () => {
      currentMouse.x += (mouse.x - currentMouse.x) * 0.06;
      currentMouse.y += (mouse.y - currentMouse.y) * 0.06;

      // Only apply 2.5D mouse tilt when user is near top of Hero (scrollProgress < 0.1)
      const blend = Math.max(0, 1 - scrollProgressRef.current * 10);

      if (bottleVisualRef.current && !isSpinningRef.current && blend > 0.01) {
        const rotateY = currentMouse.x * 22 * blend;
        const rotateX = -currentMouse.y * 16 * blend;
        const translateX = currentMouse.x * 20 * blend;
        const translateY = currentMouse.y * 20 * blend;

        bottleVisualRef.current.style.transform = `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translate3d(${translateX}px, ${translateY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animateTilt);
    };

    animateTilt();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 3D Flip & Spin on product switch
  useEffect(() => {
    if (activeId === previousIdRef.current) return;

    setIsSwitching(true);
    isSpinningRef.current = true;
    previousIdRef.current = activeId;

    const bottle = bottleVisualRef.current;
    if (!bottle) {
      setDisplayProduct(activeProduct);
      isSpinningRef.current = false;
      setIsSwitching(false);
      return;
    }

    // Morph CSS root background variables smoothly
    const targetTheme = activeProduct.theme;
    gsap.to(document.documentElement, {
      '--bg-inner': targetTheme.bgInner,
      '--bg-mid': targetTheme.bgMid,
      '--bg-outer': targetTheme.bgOuter,
      '--accent-color': targetTheme.accent,
      '--accent-glow': targetTheme.accentGlow,
      duration: 1.2,
      ease: 'power2.inOut',
    });

    // Spin animation
    const spinTimeline = gsap.timeline({
      onComplete: () => {
        isSpinningRef.current = false;
        setIsSwitching(false);
        // Refresh ScrollTrigger to recalculate exact destination card coordinates
        ScrollTrigger.refresh();
      },
    });

    const spinState = { rotationY: 0, blur: 0, scale: 1 };

    spinTimeline
      .to(spinState, {
        rotationY: 180,
        blur: 12,
        scale: 0.88,
        duration: 0.45,
        ease: 'power2.in',
        onUpdate: () => {
          bottle.style.filter = `blur(${spinState.blur}px) drop-shadow(0 25px 45px rgba(0,0,0,0.6))`;
          bottle.style.transform = `perspective(1200px) rotateY(${spinState.rotationY}deg) scale(${spinState.scale})`;
        },
        onComplete: () => {
          setDisplayProduct(activeProduct);
        },
      })
      .to(spinState, {
        rotationY: 360,
        blur: 0,
        scale: 1,
        duration: 0.85,
        ease: 'back.out(0.8)',
        onUpdate: () => {
          bottle.style.filter = `blur(${spinState.blur}px) drop-shadow(0 30px 60px rgba(0,0,0,0.7))`;
          bottle.style.transform = `perspective(1200px) rotateY(${spinState.rotationY}deg) scale(${spinState.scale})`;
        },
        onComplete: () => {
          bottle.style.filter = 'drop-shadow(0 25px 50px rgba(0,0,0,0.7))';
        },
      });

    return () => {
      spinTimeline.kill();
    };
  }, [activeId, activeProduct, setIsSwitching]);

  // Main ScrollTrigger Animation Orchestration
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const showcaseEl = showcaseRef.current;
      const heroStageEl = heroStageRef.current;
      const productsStageEl = productsStageRef.current;
      const travelingBottleEl = travelingBottleRef.current;
      const heroLeftEl = heroLeftRef.current;
      const heroRightEl = heroRightRef.current;
      const spotlightEl = spotlightRef.current;
      const bottleVisual = bottleVisualRef.current;

      if (!showcaseEl || !heroStageEl || !productsStageEl || !travelingBottleEl || !bottleVisual) return;

      // Dynamic calculation of traveling bottle target coordinates and scale
      const getTravelCoordinates = () => {
        const targetSlot = cardSlotRefs.current[activeId];
        if (!targetSlot || !showcaseEl || !bottleVisual) {
          // Fallback defaults for desktop
          return {
            deltaX: activeId === 'sunsilk' ? -380 : 380,
            deltaY: 40,
            scale: 0.48,
          };
        }

        // Measure slot and showcase relative to viewport
        const slotRect = targetSlot.getBoundingClientRect();
        const showcaseRect = showcaseEl.getBoundingClientRect();

        // Slot center point
        const slotCenterX = slotRect.left + slotRect.width / 2;
        const slotCenterY = slotRect.top + slotRect.height / 2;

        // Showcase center point (where traveling bottle origin is placed via top: 50%, left: 50%)
        const showcaseCenterX = showcaseRect.left + showcaseRect.width / 2;
        const showcaseCenterY = showcaseRect.top + showcaseRect.height / 2;

        const deltaX = slotCenterX - showcaseCenterX;
        const deltaY = slotCenterY - showcaseCenterY;

        // Accurate scale calculation: slot height divided by hero bottle native rendered height
        const heroHeight = bottleVisual.offsetHeight || 530;
        const slotHeight = slotRect.height || 256;
        const targetScale = Math.min(slotHeight / heroHeight, slotRect.width / (bottleVisual.offsetWidth || 320)) * 0.95;

        return {
          deltaX,
          deltaY,
          scale: targetScale > 0.1 ? targetScale : 0.48,
        };
      };

      // Master Timeline linked to ScrollTrigger with scrub
      const masterTl = gsap.timeline({
        scrollTrigger: {
          id: 'showcase-st',
          trigger: showcaseEl,
          start: 'top top',
          end: '+=150%',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      timelineRef.current = masterTl;

      // ---------------------------------------------------------------------
      // PHASE 1 & 2: Hero Scroll Begins (0.00 -> 0.35)
      // Bottle tilts 26-30 degrees, scales up slightly toward viewer (1.08x)
      // Hero text slides outward and fades away
      // ---------------------------------------------------------------------
      masterTl
        .to(
          travelingBottleEl,
          {
            rotation: 28,
            scale: 1.08,
            ease: 'power1.out',
            duration: 0.35,
          },
          0
        )
        .to(
          spotlightEl,
          {
            scale: 1.3,
            opacity: 0.8,
            duration: 0.35,
          },
          0
        );

      if (heroLeftEl) {
        masterTl.to(
          heroLeftEl,
          {
            x: -110,
            opacity: 0,
            ease: 'power2.in',
            duration: 0.3,
          },
          0.05
        );
      }

      if (heroRightEl) {
        masterTl.to(
          heroRightEl,
          {
            x: 110,
            opacity: 0,
            ease: 'power2.in',
            duration: 0.3,
          },
          0.05
        );
      }

      // Hide hero stage pointer interactivity as it fades
      masterTl.to(
        heroStageEl,
        {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.25,
        },
        0.25
      );

      // ---------------------------------------------------------------------
      // PHASE 3: Products Stage Emerges (0.30 -> 0.85)
      // ---------------------------------------------------------------------
      masterTl.fromTo(
        productsStageEl,
        {
          opacity: 0,
          y: 70,
          pointerEvents: 'none',
        },
        {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          ease: 'power2.out',
          duration: 0.5,
        },
        0.3
      );

      // Traveling Bottle moves from Hero center to Product Card destination!
      masterTl.to(
        travelingBottleEl,
        {
          x: () => getTravelCoordinates().deltaX,
          y: () => getTravelCoordinates().deltaY,
          scale: () => getTravelCoordinates().scale,
          rotation: -1.5, // Gentle slight natural card tilt
          ease: 'power2.inOut',
          duration: 0.55,
        },
        0.3
      );

      // ---------------------------------------------------------------------
      // PHASE 4: Landing & Card Settle (0.80 -> 1.00)
      // ---------------------------------------------------------------------
      const activeCardContainer = cardContainerRefs.current[activeId];
      if (activeCardContainer) {
        masterTl.fromTo(
          activeCardContainer,
          {
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
          },
          {
            boxShadow: `0 25px 70px ${activeProduct.theme.accentGlow}`,
            borderColor: activeProduct.theme.accent,
            duration: 0.2,
            ease: 'power1.out',
          },
          0.8
        );
      }

      // Stagger entrance of specs sheet and CTA button in active card
      const specsBox = activeCardContainer?.querySelector('.packaging-specs-box');
      const ctaBtn = activeCardContainer?.querySelector('.action-cta-container');

      if (specsBox) {
        masterTl.fromTo(
          specsBox,
          { opacity: 0.3, y: 12 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.85
        );
      }

      if (ctaBtn) {
        masterTl.fromTo(
          ctaBtn,
          { opacity: 0.3, y: 10 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.88
        );
      }
    }, showcaseRef);

    return () => {
      ctx.revert();
    };
  }, [activeId, activeProduct]);

  return (
    <div
      id="showcase-container"
      ref={showcaseRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        background: `radial-gradient(circle at 50% 45%, var(--bg-inner) 0%, var(--bg-mid) 50%, var(--bg-outer) 100%)`,
      }}
    >
      {/* Pinned Stage Viewport (100vh) */}
      <div className="relative w-full h-[100dvh] min-h-[700px] max-h-[1050px] overflow-hidden flex items-center justify-center">
        {/* Floating Ambient Particles Layer (Persists throughout Hero) */}
        <ProductFloatingElements />

        {/* ------------------------------------------------------------------------- */}
        {/* HERO STAGE LAYER (#home) */}
        {/* ------------------------------------------------------------------------- */}
        <section
          id="home"
          ref={heroStageRef}
          className="absolute inset-0 w-full h-full flex flex-col justify-between px-6 sm:px-10 lg:px-16 z-10 transition-opacity duration-300"
          style={{ paddingTop: '128px', paddingBottom: '32px' }}
        >
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
            {/* Left Column: Cursive Title, Description, CTA, Award Badge */}
            <div
              ref={heroLeftRef}
              className="w-[320px] xl:w-[380px] flex flex-col justify-between items-start pointer-events-auto z-30 py-3 will-change-transform"
            >
              <div className="space-y-4 pt-4 sm:pt-6">
                <h1 className="hero-cursive-title transition-all duration-700">
                  <span className="outline-title block leading-none">{activeProduct.heroHeadline.leftLine1}</span>
                  <span className="text-white drop-shadow-xl block leading-none mt-1 sm:mt-2">
                    {activeProduct.heroHeadline.leftLine2}
                  </span>
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

            {/* Center Reference Anchor Slot for calculations */}
            <div ref={heroCenterSlotRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-10" />

            {/* Right Column: Carousel Cards & Side Cursive Title */}
            <div
              ref={heroRightRef}
              className="w-[320px] xl:w-[380px] flex flex-col justify-between items-end text-right pointer-events-auto z-30 py-3 will-change-transform"
            >
              {/* Top: Carousel Cards */}
              <div className="pointer-events-auto">
                <ProductCarouselCards />
              </div>

              {/* Bottom: Side Cursive Title & Tagline */}
              <div className="flex flex-col items-end mt-auto pb-1">
                <h2 className="hero-cursive-side transition-all duration-700">
                  <span className="outline-title block leading-none">{activeProduct.heroHeadline.rightLine1}</span>
                  <span className="text-white drop-shadow-xl block leading-none mt-1 sm:mt-2">
                    {activeProduct.heroHeadline.rightLine2}
                  </span>
                </h2>
                <div className="flex items-center gap-1.5 mt-2 text-white/70 text-[11px] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{activeProduct.tagline}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hero Flow (< 1024px) */}
          <div className="flex lg:hidden flex-col items-center justify-between text-center w-full max-w-lg mx-auto relative z-20 h-full py-2 pointer-events-none">
            <div className="space-y-1.5 px-4 w-full pointer-events-auto pt-1">
              <h1 className="hero-cursive-title transition-all duration-700">
                <span className="outline-title mr-2">{activeProduct.heroHeadline.leftLine1}</span>
                <span className="text-white drop-shadow-xl">{activeProduct.heroHeadline.leftLine2}</span>
              </h1>
              <p className="text-white/80 text-xs leading-relaxed max-w-[300px] mx-auto font-normal">
                {activeProduct.description}
              </p>
            </div>

            <div className="w-full flex justify-center pb-2 z-30 mt-auto pointer-events-auto">
              <ProductCarouselCards />
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

        {/* ------------------------------------------------------------------------- */}
        {/* PRODUCTS STAGE LAYER (#products) */}
        {/* Initially hidden with opacity-0, fades in during scroll phase 3 */}
        {/* ------------------------------------------------------------------------- */}
        <section
          id="products"
          ref={productsStageRef}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-5 sm:px-8 md:px-12 lg:px-16 z-20 will-change-transform"
          style={{
            opacity: 0,
            pointerEvents: 'none',
            transform: 'translateY(70px)',
          }}
        >
          <div className="max-w-7xl mx-auto w-full pt-16 sm:pt-14">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/15 text-xs font-semibold tracking-wider uppercase text-white/80">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                Curated Hair Care Formulations
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white">
                Dual Botanical & Salon Formulations
              </h2>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
                Formulated to address distinct hair needs: instant thermal repair and glass shine with Sunsilk Super Serum, and deep cellular hydration with Parachute Aloe Vera Enriched Coconut Oil.
              </p>
            </div>

            {/* Mobile Pill Switcher */}
            <div className="flex lg:hidden items-center justify-center gap-2 mb-3">
              <button
                onClick={() => switchProduct('sunsilk')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeId === 'sunsilk'
                    ? 'bg-[#fde047] text-[#1c1002] shadow-md'
                    : 'glass text-white/70 hover:text-white'
                }`}
              >
                Sunsilk Serum
              </button>
              <button
                onClick={() => switchProduct('parachute')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeId === 'parachute'
                    ? 'bg-[#67e8f9] text-[#022135] shadow-md'
                    : 'glass text-white/70 hover:text-white'
                }`}
              >
                Parachute Oil
              </button>
            </div>

            {/* Dual Product Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
              {/* Card 1: Sunsilk */}
              <div
                ref={(el) => {
                  cardContainerRefs.current['sunsilk'] = el;
                }}
                onClick={() => switchProduct('sunsilk')}
                className={`relative rounded-3xl p-5 sm:p-7 lg:p-8 transition-all duration-500 cursor-pointer overflow-hidden group flex-col justify-between ${
                  activeId === 'sunsilk'
                    ? 'flex w-full max-w-md mx-auto lg:max-w-none glass border-2 shadow-2xl'
                    : 'hidden lg:flex glass-card hover:border-white/30 hover:-translate-y-1'
                }`}
                style={{
                  borderColor: activeId === 'sunsilk' ? '#fde047' : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: activeId === 'sunsilk' ? '0 20px 60px rgba(245, 158, 11, 0.4)' : undefined,
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
                  <span className="text-xs uppercase tracking-widest text-white/60 font-semibold font-nav truncate">
                    Sunsilk • Thermal Protection & Shine
                  </span>
                  {activeId === 'sunsilk' && (
                    <div
                      className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 flex-shrink-0"
                      style={{
                        backgroundColor: '#fde047',
                        color: '#1c1002',
                      }}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                      Active In Hero
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 lg:gap-7 flex-1">
                  {/* Bottle Visual Slot */}
                  <div
                    ref={(el) => {
                      cardSlotRefs.current['sunsilk'] = el;
                    }}
                    className="relative w-36 sm:w-44 h-56 sm:h-64 flex-shrink-0 flex items-center justify-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
                  >
                    {/* If Sunsilk is inactive, show its own static bottle */}
                    {activeId !== 'sunsilk' && (
                      <Image
                        src="/images/products/sunsilk_amber.png"
                        alt="Sunsilk Super Serum"
                        fill
                        sizes="180px"
                        className="object-contain"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-between text-left w-full min-w-0 flex-1 h-full">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
                        Style & Heat Protect Super Serum
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 mb-2.5">
                        <span className="text-2xl font-extrabold text-white font-display">$14.99</span>
                        <span className="text-xs text-white/60 border border-white/20 px-2.5 py-0.5 rounded-full font-medium">
                          100ml
                        </span>
                      </div>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3">
                        Peptide-Repair Complex 10% • 100% Multi-Protection
                      </p>
                    </div>

                    <div className="packaging-specs-box bg-black/35 rounded-2xl p-3.5 border border-white/10 space-y-1.5 mb-4 text-xs">
                      <div className="flex justify-between">
                        <span className="text-white/45 uppercase text-[10px]">Active Complex</span>
                        <span className="font-semibold text-white/95">10% Peptide-Repair Complex</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/5">
                        <span className="text-white/45 uppercase text-[10px]">Hair Profile</span>
                        <span className="font-semibold text-white/95">All Hair Types & Heat-Styled</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/5">
                        <span className="text-white/45 uppercase text-[10px]">Finish</span>
                        <span className="font-semibold text-white/95">Non-Greasy Liquid Gold Serum</span>
                      </div>
                    </div>

                    <div className="action-cta-container pt-1 mt-auto">
                      <button
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-xl"
                        style={{
                          backgroundColor: activeId === 'sunsilk' ? '#fde047' : 'rgba(255, 255, 255, 0.12)',
                          color: activeId === 'sunsilk' ? '#1c1002' : '#ffffff',
                        }}
                      >
                        <span>{activeId === 'sunsilk' ? 'Viewing in Showcase' : 'Preview In Hero Experience'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Parachute */}
              <div
                ref={(el) => {
                  cardContainerRefs.current['parachute'] = el;
                }}
                onClick={() => switchProduct('parachute')}
                className={`relative rounded-3xl p-5 sm:p-7 lg:p-8 transition-all duration-500 cursor-pointer overflow-hidden group flex-col justify-between ${
                  activeId === 'parachute'
                    ? 'flex w-full max-w-md mx-auto lg:max-w-none glass border-2 shadow-2xl'
                    : 'hidden lg:flex glass-card hover:border-white/30 hover:-translate-y-1'
                }`}
                style={{
                  borderColor: activeId === 'parachute' ? '#67e8f9' : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: activeId === 'parachute' ? '0 20px 60px rgba(56, 189, 248, 0.4)' : undefined,
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
                  <span className="text-xs uppercase tracking-widest text-white/60 font-semibold font-nav truncate">
                    Parachute Advansed • Botanical Hydration
                  </span>
                  {activeId === 'parachute' && (
                    <div
                      className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 flex-shrink-0"
                      style={{
                        backgroundColor: '#67e8f9',
                        color: '#022135',
                      }}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                      Active In Hero
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 lg:gap-7 flex-1">
                  {/* Bottle Visual Slot */}
                  <div
                    ref={(el) => {
                      cardSlotRefs.current['parachute'] = el;
                    }}
                    className="relative w-36 sm:w-44 h-56 sm:h-64 flex-shrink-0 flex items-center justify-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
                  >
                    {/* If Parachute is inactive, show its own static bottle */}
                    {activeId !== 'parachute' && (
                      <Image
                        src="/images/products/parachute_blue.png"
                        alt="Parachute Aloe Hair Oil"
                        fill
                        sizes="180px"
                        className="object-contain"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-between text-left w-full min-w-0 flex-1 h-full">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
                        Aloe Vera Enriched Coconut Hair Oil
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 mb-2.5">
                        <span className="text-2xl font-extrabold text-white font-display">$11.99</span>
                        <span className="text-xs text-white/60 border border-white/20 px-2.5 py-0.5 rounded-full font-medium">
                          150ml
                        </span>
                      </div>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3">
                        Aloe Vera & Enriched Coconut • For Soft Nourished Hair
                      </p>
                    </div>

                    <div className="packaging-specs-box bg-black/35 rounded-2xl p-3.5 border border-white/10 space-y-1.5 mb-4 text-xs">
                      <div className="flex justify-between">
                        <span className="text-white/45 uppercase text-[10px]">Active Complex</span>
                        <span className="font-semibold text-white/95">Pure Aloe Vera & Deep Coconut Oil</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/5">
                        <span className="text-white/45 uppercase text-[10px]">Hair Profile</span>
                        <span className="font-semibold text-white/95">Dry, Dull, & Thirsty Strands</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/5">
                        <span className="text-white/45 uppercase text-[10px]">Finish</span>
                        <span className="font-semibold text-white/95">Ultra-Lightweight Enriched Oil</span>
                      </div>
                    </div>

                    <div className="action-cta-container pt-1 mt-auto">
                      <button
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-xl"
                        style={{
                          backgroundColor: activeId === 'parachute' ? '#67e8f9' : 'rgba(255, 255, 255, 0.12)',
                          color: activeId === 'parachute' ? '#022135' : '#ffffff',
                        }}
                      >
                        <span>{activeId === 'parachute' ? 'Viewing in Showcase' : 'Preview In Hero Experience'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------------- */}
        {/* THE SHARED TRAVELING BOTTLE LAYER (Centered at Hero, Travels to Card) */}
        {/* ------------------------------------------------------------------------- */}
        <div
          ref={travelingBottleRef}
          className="absolute z-30 pointer-events-none will-change-transform flex items-center justify-center"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Ambient Spotlight */}
          <div
            ref={spotlightRef}
            className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] rounded-full blur-[80px] pointer-events-none transition-all duration-1000 animate-pulse-glow"
            style={{
              background: `radial-gradient(circle, ${activeProduct.theme.accentGlow} 0%, transparent 70%)`,
            }}
          />

          {/* Sizable Flagship Bottle Visual Container (Larger Hero Size) */}
          <div
            ref={bottleVisualRef}
            className="relative w-[210px] h-[350px] sm:w-[260px] sm:h-[430px] md:w-[300px] md:h-[490px] lg:w-[320px] lg:h-[530px] xl:w-[350px] xl:h-[570px] will-change-transform drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
          >
            <Image
              src={displayProduct.image}
              alt={displayProduct.name}
              fill
              priority
              sizes="(max-width: 640px) 220px, (max-width: 1024px) 300px, 380px"
              className="object-contain filter contrast-[1.03] select-none"
            />

            {/* Specular glass sheen highlight */}
            <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden opacity-25">
              <div
                className="w-full h-[200%] absolute -top-1/2 left-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -rotate-45"
                style={{ animation: 'shine 7s ease-in-out infinite' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
