'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useActiveProduct } from '../context/ProductContext';
import gsap from 'gsap';

export function ProductHeroCenter() {
  const { activeProduct, activeId, setIsSwitching } = useActiveProduct();
  const containerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const [displayProduct, setDisplayProduct] = useState(activeProduct);
  const previousIdRef = useRef(activeProduct.id);
  const isSpinningRef = useRef(false);

  // Keep displayProduct synced
  useEffect(() => {
    if (!isSpinningRef.current) {
      setDisplayProduct(activeProduct);
    }
  }, [activeProduct]);

  // Mouse tilt tracking (Soda-inspired 2.5D cursor tracking)
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

      if (bottleRef.current && !isSpinningRef.current) {
        const rotateY = currentMouse.x * 20;
        const rotateX = -currentMouse.y * 15;
        const translateX = currentMouse.x * 18;
        const translateY = currentMouse.y * 18;

        bottleRef.current.style.transform = `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translate3d(${translateX}px, ${translateY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animateTilt);
    };

    animateTilt();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Product Switch Choreography with GSAP
  useEffect(() => {
    if (activeId === previousIdRef.current) return;

    setIsSwitching(true);
    isSpinningRef.current = true;
    previousIdRef.current = activeId;

    const bottle = bottleRef.current;
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
      duration: 1.4,
      ease: 'power2.inOut',
    });

    // Spin & Motion Blur Animation (inspired by Soda's can spin)
    const spinTimeline = gsap.timeline({
      onComplete: () => {
        isSpinningRef.current = false;
        setIsSwitching(false);
      },
    });

    const spinState = { rotationY: 0, blur: 0, scale: 1 };

    spinTimeline
      .to(spinState, {
        rotationY: 180,
        blur: 14,
        scale: 0.88,
        duration: 0.5,
        ease: 'power2.in',
        onUpdate: () => {
          bottle.style.filter = `blur(${spinState.blur}px) drop-shadow(0 25px 45px rgba(0,0,0,0.6))`;
          bottle.style.transform = `perspective(1200px) rotateY(${spinState.rotationY}deg) scale(${spinState.scale})`;
        },
        onComplete: () => {
          // Swap image at peak of flip
          setDisplayProduct(activeProduct);
        },
      })
      .to(spinState, {
        rotationY: 360,
        blur: 0,
        scale: 1,
        duration: 0.9,
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

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center pointer-events-none select-none overflow-visible relative"
    >
      {/* Ambient Radial Spotlight behind bottle */}
      <div
        className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] rounded-full blur-[80px] pointer-events-none transition-all duration-1000 animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${activeProduct.theme.accentGlow} 0%, transparent 70%)`,
        }}
      />

      {/* Floating Bottle Wrapper with Gentle Bobbing */}
      <div className="animate-float-bottle relative flex items-center justify-center pointer-events-auto">
        <div
          ref={bottleRef}
          className="relative w-[170px] h-[280px] sm:w-[210px] sm:h-[340px] md:w-[240px] md:h-[390px] lg:w-[250px] lg:h-[410px] xl:w-[280px] xl:h-[450px] transition-transform duration-100 ease-out will-change-transform cursor-pointer drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
        >
          <Image
            src={displayProduct.image}
            alt={displayProduct.name}
            fill
            priority
            sizes="(max-width: 640px) 170px, (max-width: 1024px) 250px, 300px"
            className="object-contain filter contrast-[1.03] select-none"
          />

          {/* Glass specular sheen highlight overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden opacity-25">
            <div
              className="w-full h-[200%] absolute -top-1/2 left-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -rotate-45"
              style={{ animation: 'shine 7s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
