'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductScene, ProductSceneHandle } from './ProductScene';
import { SHOWCASE_CONFIG } from '../config/showcaseConfig';
import { Sparkles, Wind } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ShowcaseStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ProductSceneHandle>(null);

  const heroCopyRef = useRef<HTMLDivElement>(null);
  const chapterCopyRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isSpraying, setIsSpraying] = useState(false);

  const { product, chapters } = SHOWCASE_CONFIG;

  const handleSpray = () => {
    if (sceneRef.current) {
      sceneRef.current.triggerSpray();
      setIsSpraying(true);
      setTimeout(() => setIsSpraying(false), 900);
    }
  };

  const jumpToChapter = (chapterNum: number) => {
    if (!stageRef.current) return;
    const stageTop = stageRef.current.offsetTop;
    const stageHeight = stageRef.current.offsetHeight - window.innerHeight;
    const targetScroll = stageTop + (stageHeight * (chapterNum / 3));

    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetScroll, { duration: 1.4 });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const isMobile = window.innerWidth < 1024;
    const totalChapters = 3;

    let prevActive = -1;

    const st = ScrollTrigger.create({
      trigger: stageEl,
      start: 'top top',
      end: 'bottom bottom',
      pin: frameRef.current,
      pinSpacing: false,
      scrub: isMobile ? 0.4 : 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const rawProgress = self.progress * totalChapters;
        if (sceneRef.current) {
          sceneRef.current.setScrollProgress(rawProgress);
        }

        // Active chapter calculation (0: Hero, 1: Nectar, 2: Aloe, 3: Cedar)
        const currentActive = Math.round(Math.min(totalChapters, Math.max(0, rawProgress)));

        if (currentActive !== prevActive) {
          setActiveChapterIndex(currentActive);

          // Animate Hero copy
          if (heroCopyRef.current) {
            if (currentActive === 0) {
              gsap.to(heroCopyRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                overwrite: 'auto',
              });
            } else {
              gsap.to(heroCopyRef.current, {
                autoAlpha: 0,
                y: -24,
                duration: 0.4,
                ease: 'power2.in',
                overwrite: 'auto',
              });
            }
          }

          // Animate Chapter copies
          chapterCopyRefs.current.forEach((el, idx) => {
            if (!el) return;
            const chapterNum = idx + 1; // 1, 2, 3

            if (chapterNum === currentActive) {
              gsap.fromTo(
                el,
                { autoAlpha: 0, y: 28 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.75,
                  ease: 'power3.out',
                  overwrite: 'auto',
                }
              );
            } else if (chapterNum === prevActive) {
              gsap.to(el, {
                autoAlpha: 0,
                y: -20,
                duration: 0.4,
                ease: 'power2.in',
                overwrite: 'auto',
              });
            } else {
              gsap.set(el, { autoAlpha: 0, y: 20 });
            }
          });

          prevActive = currentActive;
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      ref={stageRef}
      id="showcase"
      className="relative w-full h-[400vh] bg-[#0c0a09] select-none"
      aria-label="VERA 3D Product Experience"
    >
      {/* Pinned Viewport Stage Frame (Sticky 100vh) */}
      <div
        ref={frameRef}
        className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center z-10"
      >
        {/* Persistent Three.js WebGL Canvas Stage */}
        <ProductScene ref={sceneRef} />

        {/* ========================================================================= */}
        {/* CHAPTER 0: EDITORIAL HERO COPY LAYER */}
        {/* ========================================================================= */}
        <div
          ref={heroCopyRef}
          className="absolute inset-0 w-full h-full flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-24 sm:pt-28 pb-10 sm:pb-12 pointer-events-none z-20"
        >
          {/* Top Editorial Kicker & Kicker Bar */}
          <div className="flex flex-col items-start gap-2 max-w-xl">
            <span className="kicker text-[#d97706] tracking-[0.22em] text-xs sm:text-sm font-semibold uppercase">
              {product.kicker}
            </span>
          </div>

          {/* Bottom Left: Title, Lede, Spray CTA */}
          <div className="flex flex-col items-start max-w-2xl pointer-events-auto">
            <h1 className="stage-title text-[#fefdfa] tracking-tight leading-[0.92] mb-4 sm:mb-6">
              <span className="block text-white/50 text-2xl sm:text-4xl lg:text-5xl font-sans tracking-[0.14em] uppercase font-light mb-1">
                {product.brand}
              </span>
              <span className="block font-serif italic text-4xl sm:text-7xl lg:text-8xl drop-shadow-2xl">
                {product.name}
              </span>
            </h1>

            <p className="stage-lede text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md font-sans">
              {product.lede}
            </p>

            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => jumpToChapter(1)}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium tracking-wide backdrop-blur-md border border-white/20 transition-all duration-300 hover:border-white/40 shadow-xl"
              >
                <span>Discover the notes</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] group-hover:scale-125 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleSpray}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 backdrop-blur-md border ${
                  isSpraying
                    ? 'bg-[#f59e0b] text-[#141412] border-[#f59e0b] scale-105 shadow-[0_0_30px_rgba(245,158,11,0.6)]'
                    : 'bg-black/40 hover:bg-black/60 text-white/90 border-white/25 hover:border-white/50'
                }`}
                aria-label="Spray atomizer mist"
              >
                <Wind className="w-3.5 h-3.5" />
                <span>{isSpraying ? 'Misting…' : 'Spray'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHAPTERS 1, 2, 3: STORY & INGREDIENT CHAPTERS */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20 flex items-center justify-between px-6 sm:px-12 lg:px-20">
          {/* Chapter Cards placed cleanly in lower-left / mid-right */}
          {chapters.slice(1).map((ch, idx) => (
            <article
              key={ch.id}
              ref={(el) => {
                chapterCopyRefs.current[idx] = el;
              }}
              className={`absolute ${
                SHOWCASE_CONFIG.layout.bottleScrollOffsetDirection === 'left'
                  ? 'right-6 sm:right-14 lg:right-36 bottom-20 sm:bottom-24 lg:bottom-28'
                  : 'left-6 sm:left-12 lg:left-20 bottom-12 sm:bottom-16'
              } max-w-sm sm:max-w-md lg:max-w-lg pointer-events-auto opacity-0`}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="glass-card rounded-3xl p-6 sm:p-8 lg:p-9 border border-white/15 backdrop-blur-2xl bg-black/45 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-3">
                <p className="kicker flex items-center gap-2" style={{ color: ch.accent }}>
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                    {ch.num}
                  </span>
                  <span>{ch.kicker}</span>
                </p>

                <h2 className="stage-h2 text-white font-serif tracking-tight leading-tight">
                  {ch.title}
                </h2>

                <p className="text-white/80 text-xs sm:text-sm lg:text-base leading-relaxed font-sans pt-1">
                  {ch.description}
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                  <span>Atelier Chapter {ch.num}</span>
                  <span className="text-white font-medium">Lumina · VERA</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDE VERTICAL CHAPTER INDEX NAVIGATOR (01 / 02 / 03) */}
        {/* ========================================================================= */}
        <nav
          className="absolute right-6 sm:right-10 lg:right-14 bottom-10 sm:bottom-14 z-30 flex flex-col gap-3 pointer-events-auto"
          aria-label="Showcase chapter index"
        >
          {chapters.slice(1).map((ch, idx) => {
            const chapterNum = idx + 1;
            const isActive = activeChapterIndex === chapterNum;

            return (
              <button
                key={ch.id}
                onClick={() => jumpToChapter(chapterNum)}
                className={`group flex items-center gap-3 px-3.5 py-1.5 rounded-full transition-all duration-300 text-left ${
                  isActive
                    ? 'bg-white/15 backdrop-blur-md border border-white/30 text-white shadow-lg'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <span
                  className={`text-xs font-mono font-bold transition-colors ${
                    isActive ? 'text-[#f59e0b]' : 'text-white/40 group-hover:text-white/60'
                  }`}
                >
                  {ch.num}
                </span>
                <span className="hidden sm:inline text-xs font-sans font-medium tracking-wide">
                  {ch.title.split(' ')[0]}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#f59e0b] scale-125' : 'bg-white/30 group-hover:bg-white/60'
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
