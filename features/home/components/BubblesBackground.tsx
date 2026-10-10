'use client';

import React, { useEffect, useRef } from 'react';

export function BubblesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isMounted = true;

    function spawnBubble() {
      if (!isMounted || !container) return;

      const bubble = document.createElement('img');
      bubble.src = '/images/ingredients/bubble.png';
      bubble.alt = '';
      bubble.className = 'absolute pointer-events-none select-none z-0';

      const size = Math.floor(Math.random() * 26 + 12); // 12px to 38px
      const left = Math.random() * 100;
      const opacity = (Math.random() * 0.35 + 0.25).toFixed(2);
      const duration = (Math.random() * 5 + 5).toFixed(1); // 5s to 10s
      const delay = (Math.random() * 0.5).toFixed(2);

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.bottom = '-60px';
      bubble.style.opacity = opacity;
      bubble.style.animation = `floatUpImg ${duration}s linear ${delay}s forwards`;

      container.appendChild(bubble);

      const cleanupTimer = setTimeout(() => {
        if (bubble.parentNode === container) {
          container.removeChild(bubble);
        }
      }, (parseFloat(duration) + parseFloat(delay) + 0.5) * 1000);

      return cleanupTimer;
    }

    // Initial batch
    for (let i = 0; i < 6; i++) {
      spawnBubble();
    }

    const interval = setInterval(spawnBubble, 450);

    return () => {
      isMounted = false;
      clearInterval(interval);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="bubbles-container"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
