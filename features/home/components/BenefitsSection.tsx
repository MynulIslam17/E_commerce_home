'use client';

import React, { useRef, useEffect } from 'react';
import { useActiveProduct } from '@/features/products/context/ProductContext';
import {
  Flame,
  ShieldCheck,
  Sparkles,
  Wind,
  Droplets,
  Feather,
  HeartPulse,
  Flower2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ICON_MAP: Record<string, React.ElementType> = {
  Flame,
  ShieldCheck,
  Sparkles,
  Wind,
  Droplets,
  Feather,
  HeartPulse,
  Flower2,
};

export function BenefitsSection() {
  const { activeProduct, activeId } = useActiveProduct();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const ritualContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Benefits cards staggered 3D cascade
      if (cardsGridRef.current) {
        const cards = cardsGridRef.current.querySelectorAll('.benefit-card');
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Ritual steps sequential reveal
      if (ritualContainerRef.current) {
        const steps = ritualContainerRef.current.querySelectorAll('.ritual-step-card');
        gsap.fromTo(
          steps,
          {
            opacity: 0,
            x: -25,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ritualContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeId]);

  return (
    <section id="benefits" ref={sectionRef} className="relative w-full py-28 px-5 sm:px-8 md:px-12 lg:px-16 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/15 text-xs font-semibold tracking-wider uppercase text-white/80">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Performance & Proven Benefits
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Transformative Results for Every Strand
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Engineered to deliver noticeable improvements in smoothness, thermal resilience, and softness without compromising hair lightness.
          </p>
        </div>

        {/* Benefits Grid */}
        <div ref={cardsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {activeProduct.benefits.map((b) => {
            const Icon = ICON_MAP[b.iconName] || Sparkles;

            return (
              <div
                key={b.title}
                className="benefit-card glass-card rounded-3xl p-7 lg:p-8 border border-white/15 flex flex-col justify-between hover:border-white/35 transition-all duration-300 hover:-translate-y-2 group min-h-[260px] relative overflow-hidden"
              >
                {/* Glow accent corner */}
                <div
                  className="absolute top-0 right-0 w-28 h-28 rounded-full blur-[45px] opacity-15 pointer-events-none group-hover:opacity-35 transition-opacity"
                  style={{ backgroundColor: activeProduct.theme.accent }}
                />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-md mb-6"
                    style={{
                      backgroundColor: activeProduct.theme.badgeBg,
                      color: activeProduct.theme.accent,
                      border: `1px solid ${activeProduct.theme.badgeBorder}`,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <span
                      className="text-xs font-bold uppercase tracking-wider block mb-1"
                      style={{ color: activeProduct.theme.accent }}
                    >
                      {b.metric}
                    </span>
                    <h3 className="text-lg font-bold font-display text-white mb-2 leading-snug">
                      {b.title}
                    </h3>
                  </div>

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed mt-2">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Usage Ritual & Application Guide */}
        <div ref={ritualContainerRef} className="glass rounded-3xl p-8 sm:p-12 border border-white/20 relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-white/50">
              Salon Care Guide
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              How To Apply For Peak Performance
            </h3>
            <p className="text-white/70 text-sm mt-2">
              Follow this step-by-step application ritual to maximize the efficacy of{' '}
              <strong className="text-white">{activeProduct.name}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeProduct.usageInstructions.map((instruction, idx) => (
              <div
                key={idx}
                className="ritual-step-card bg-black/35 rounded-2xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between space-y-4 min-h-[190px] hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-md flex-shrink-0"
                    style={{
                      backgroundColor: activeProduct.theme.accent,
                      color: activeProduct.theme.accentText,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-xs uppercase font-bold tracking-wider text-white/80">
                    Step 0{idx + 1}
                  </span>
                </div>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed flex-1">
                  {instruction}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Salon Recommended</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
