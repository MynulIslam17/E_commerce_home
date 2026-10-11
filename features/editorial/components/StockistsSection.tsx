'use client';

import React from 'react';

export function StockistsSection() {
  const stockists = [
    { city: 'Zürich', venue: 'Lumina Atelier, Limmatquai 18' },
    { city: 'Paris', venue: 'Le Bon Marché, Rive Gauche' },
    { city: 'London', venue: 'Dover Street Market, Mayfair' },
    { city: 'Tokyo', venue: 'Ginza Six Atelier, Chuo' },
  ];

  return (
    <section
      id="stockists"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#080706] border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-10">
        <div>
          <span className="kicker text-[#d97706] tracking-[0.2em] font-semibold block mb-2">
            Selected Stockists
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">
            Available at fine apothecaries & ateliers.
          </h2>
        </div>

        <ul className="divide-y divide-white/10 w-full md:max-w-md border-y border-white/10">
          {stockists.map((s) => (
            <li key={s.city} className="py-4 sm:py-5 flex items-center justify-between gap-4">
              <span className="text-sm font-serif font-bold text-white tracking-wide">
                {s.city}
              </span>
              <span className="text-xs sm:text-sm font-sans text-white/50 text-right">
                {s.venue}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
