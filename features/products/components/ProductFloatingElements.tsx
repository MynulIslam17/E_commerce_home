'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useActiveProduct } from '../context/ProductContext';
import gsap from 'gsap';

interface IngredientState {
  rx: number;
  ry: number;
  angle: number;
  baseX: number;
  baseY: number;
}

export function ProductFloatingElements() {
  const { activeProduct, activeId, isSwitching } = useActiveProduct();
  const [items, setItems] = useState(activeProduct.floatingIngredients);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stateRef = useRef<IngredientState[]>([]);
  const prevIdRef = useRef(activeId);

  // Initialize tracking states
  useEffect(() => {
    stateRef.current = activeProduct.floatingIngredients.map((_, i) => ({
      rx: 0,
      ry: 0,
      angle: (i * 45) % 360,
      baseX: 0,
      baseY: 0,
    }));
  }, [activeProduct]);

  // Implode & Explode animation on product switch (Soda reference verbatim logic)
  useEffect(() => {
    if (activeId === prevIdRef.current) return;
    prevIdRef.current = activeId;

    const domItems = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (domItems.length === 0) {
      setItems(activeProduct.floatingIngredients);
      return;
    }

    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    const tl = gsap.timeline();

    // 1. Implode toward center
    domItems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const centerX = windowWidth / 2 - rect.left - rect.width / 2;
      const centerY = windowHeight / 2 - rect.top - rect.height / 2;

      tl.to(
        el,
        {
          x: centerX,
          y: centerY,
          scale: 0.1,
          opacity: 0,
          rotation: '+=45',
          duration: 0.45,
          ease: 'power2.in',
        },
        0
      );
    });

    // 2. Midpoint swap items
    tl.call(() => {
      setItems(activeProduct.floatingIngredients);
    });

    // 3. Explode back out to random target positions
    tl.to({}, { duration: 0.2 }); // small pause

    const isNarrow = windowWidth < 1024;
    const spread = isNarrow ? 60 : 180;

    domItems.forEach((el, i) => {
      const nextBaseX = (Math.random() - 0.5) * spread;
      const nextBaseY = (Math.random() - 0.5) * spread;

      tl.to(
        el,
        {
          x: nextBaseX,
          y: nextBaseY,
          scale: 1,
          opacity: activeProduct.floatingIngredients[i]?.opacity ?? 0.95,
          rotation: '+=90',
          duration: 0.85,
          ease: 'back.out(1.4)',
          onComplete: () => {
            if (stateRef.current[i]) {
              stateRef.current[i].baseX = nextBaseX;
              stateRef.current[i].baseY = nextBaseY;
              stateRef.current[i].rx = 0;
              stateRef.current[i].ry = 0;
            }
          },
        },
        0.7 + i * 0.03
      );
    });

    return () => {
      tl.kill();
    };
  }, [activeId, activeProduct]);

  // Pointer Repulsion & Parallax loop
  useEffect(() => {
    const mouse = { x: 0, y: 0, px: 0, py: 0 };
    const currentMouse = { x: 0, y: 0 };
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
      mouse.px = e.clientX;
      mouse.py = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const animateLoop = () => {
      const time = Date.now() * 0.001;
      currentMouse.x += (mouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (mouse.y - currentMouse.y) * 0.05;

      const domItems = itemRefs.current;
      const states = stateRef.current;

      if (!isSwitching && domItems.length > 0) {
        domItems.forEach((item, i) => {
          if (!item || !states[i]) return;

          const rect = item.getBoundingClientRect();
          const itemX = rect.left + rect.width / 2;
          const itemY = rect.top + rect.height / 2;

          const diffX = mouse.px - itemX;
          const diffY = mouse.py - itemY;
          const distance = Math.sqrt(diffX * diffX + diffY * diffY);

          let targetRx = 0;
          let targetRy = 0;
          let speedMult = 1;

          // 400px force-field repulsion
          if (distance < 380) {
            const force = (380 - distance) / 380;
            targetRx = (diffX / (distance || 1)) * force * -75;
            targetRy = (diffY / (distance || 1)) * force * -75;
            speedMult = 1 + force * 4.5;
          }

          // Lerp repulsion
          states[i].rx += (targetRx - states[i].rx) * 0.08;
          states[i].ry += (targetRy - states[i].ry) * 0.08;
          states[i].angle += 0.15 * speedMult;

          // Gentle sinusoidal floating phase
          const dur = [5.5, 7, 6, 8, 5, 6.5, 9, 10, 8.5][i % 9];
          const phase = (time + i * 0.8) * ((Math.PI * 2) / dur);
          const floatY = Math.sin(phase) * 14;
          const floatAngle = Math.cos(phase) * 5;

          const finalX = states[i].rx + states[i].baseX + currentMouse.x * (item.dataset.layer === 'fg' ? 50 : -25);
          const finalY = states[i].ry + states[i].baseY + floatY + currentMouse.y * (item.dataset.layer === 'fg' ? 50 : -25);
          const finalAngle = states[i].angle + floatAngle;

          item.style.transform = `translate3d(${finalX}px, ${finalY}px, 0) rotate(${finalAngle}deg)`;
        });
      }

      animId = requestAnimationFrame(animateLoop);
    };

    animId = requestAnimationFrame(animateLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isSwitching]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 5 }}
    >
      {items.map((item, idx) => {
        const isForeground = item.layer === 'fg';
        const zIndex = isForeground ? 5 : 2;

        return (
          <div
            key={`${item.id}-${idx}`}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            data-layer={item.layer}
            className={`absolute will-change-transform drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-opacity duration-300 ${
              !isForeground ? 'hidden sm:block' : ''
            }`}
            style={{
              top: item.top,
              left: item.left,
              width: `${item.size}px`,
              height: `${item.size}px`,
              opacity: item.opacity ?? 0.85,
              zIndex,
            }}
          >
            <div className="relative w-full h-full transform scale-75 sm:scale-90 lg:scale-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes={`${item.size}px`}
                className="object-contain pointer-events-none select-none filter contrast-105"
                priority
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
