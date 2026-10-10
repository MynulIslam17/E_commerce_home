'use client';

import React, { useRef, useEffect } from 'react';
import { useActiveProduct } from '@/features/products/context/ProductContext';
import { Star, CheckCircle, Quote, MessageSquareQuote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ReviewsSection() {
  const { activeProduct, activeId } = useActiveProduct();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const statsBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
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

      // 2. Review cards staggered reveal
      if (cardsGridRef.current) {
        const cards = cardsGridRef.current.querySelectorAll('.review-card');
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 50,
            rotateY: 8,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.85,
            stagger: 0.16,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Stats banner numbers pop-in
      if (statsBannerRef.current) {
        const stats = statsBannerRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(
          stats,
          {
            opacity: 0,
            scale: 0.8,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: statsBannerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeId]);

  return (
    <section id="reviews" ref={sectionRef} className="relative w-full py-28 px-5 sm:px-8 md:px-12 lg:px-16 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/15 text-xs font-semibold tracking-wider uppercase text-white/80">
            <MessageSquareQuote className="w-3.5 h-3.5 text-yellow-300" />
            Verified Customer & Stylist Feedback
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Endorsed by Salons & Hair Specialists
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Real feedback from professional stylists and daily users on the texture, finish, and performance of {activeProduct.name}.
          </p>
        </div>

        {/* Reviews Grid */}
        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {activeProduct.reviews.map((rev) => (
            <div
              key={rev.id}
              className="review-card glass-card rounded-3xl p-8 lg:p-9 border border-white/15 flex flex-col justify-between hover:border-white/35 transition-all duration-300 hover:-translate-y-1.5 relative min-h-[300px] overflow-hidden group"
            >
              <div className="flex flex-col flex-1 relative z-10">
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <Quote className="w-7 h-7 text-white/20 mb-3 group-hover:text-white/40 transition-colors" />

                <p className="text-white/85 text-sm sm:text-base leading-relaxed italic mb-6 flex-1">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 pb-1 border-t border-white/10 flex items-center justify-between mt-auto relative z-10">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    {rev.author}
                  </h4>
                  <p className="text-xs text-white/50 mt-0.5">{rev.role}</p>
                </div>

                {rev.verified && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats banner */}
        <div
          ref={statsBannerRef}
          className="mt-14 glass rounded-3xl p-8 sm:p-10 lg:p-12 border border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="stat-item">
            <span
              className="text-3xl sm:text-4xl font-extrabold font-display block"
              style={{ color: activeProduct.theme.accent }}
            >
              98%
            </span>
            <span className="text-xs text-white/60 font-medium mt-1.5 block">
              Reported Zero Oily Residue
            </span>
          </div>
          <div className="stat-item">
            <span
              className="text-3xl sm:text-4xl font-extrabold font-display block"
              style={{ color: activeProduct.theme.accent }}
            >
              230°C
            </span>
            <span className="text-xs text-white/60 font-medium mt-1.5 block">
              Lab-Certified Heat Tolerance
            </span>
          </div>
          <div className="stat-item">
            <span
              className="text-3xl sm:text-4xl font-extrabold font-display block"
              style={{ color: activeProduct.theme.accent }}
            >
              5X
            </span>
            <span className="text-xs text-white/60 font-medium mt-1.5 block">
              Touchably Softer Strands
            </span>
          </div>
          <div className="stat-item">
            <span
              className="text-3xl sm:text-4xl font-extrabold font-display block"
              style={{ color: activeProduct.theme.accent }}
            >
              4.9/5
            </span>
            <span className="text-xs text-white/60 font-medium mt-1.5 block">
              Average Professional Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
