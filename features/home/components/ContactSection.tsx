'use client';

import React, { useState } from 'react';
import { useActiveProduct } from '@/features/products/context/ProductContext';
import { Mail, Sparkles, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';

export function ContactSection() {
  const { activeProduct } = useActiveProduct();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [inquiryType, setInquiryType] = useState('Product Consultation');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
    }, 4000);
  };

  return (
    <section id="contact" className="relative w-full py-28 px-5 sm:px-8 md:px-12 lg:px-16 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-3xl p-8 sm:p-14 border border-white/20 relative overflow-hidden">
          {/* Ambient Glow */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] opacity-30 pointer-events-none"
            style={{ backgroundColor: activeProduct.theme.accent }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading and info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/15 text-xs font-semibold tracking-wider uppercase text-white/80">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                Hair Care Atelier & Concierge
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
                Connect With Our Hair Specialists
              </h2>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Have questions regarding which formulation suits your routine best? Or seeking salon partnership and bulk distribution? Our product specialists are here to guide you.
              </p>

              <div className="space-y-4 pt-4 text-xs sm:text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white/50 block text-[11px]">Email Concierge</span>
                    <span className="font-semibold text-white">concierge@luminahair.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white/50 block text-[11px]">Salon Line</span>
                    <span className="font-semibold text-white">+1 (800) 845-8646</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white/50 block text-[11px]">Atelier Hub</span>
                    <span className="font-semibold text-white">5th Avenue Atelier, New York, NY</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/20">
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-500">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      backgroundColor: activeProduct.theme.accent,
                      color: activeProduct.theme.accentText,
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">Inquiry Received</h3>
                  <p className="text-white/70 text-sm max-w-sm">
                    Thank you. Our hair care specialist will reach out to you within 24 business hours with custom guidance.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-white/60 hover:text-white underline pt-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jessica Miller"
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jessica@example.com"
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
                      Inquiry Subject
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-colors"
                    >
                      <option value="Product Consultation">Formula Advice & Hair Analysis</option>
                      <option value="Sunsilk Heat Protection">Sunsilk 10% Peptide Super Serum</option>
                      <option value="Parachute Aloe Hydration">Parachute Aloe Vera Coconut Oil</option>
                      <option value="Salon Partnership">Professional Salon Distribution</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 mt-2 shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      backgroundColor: activeProduct.theme.accent,
                      color: activeProduct.theme.accentText,
                    }}
                  >
                    <span>Submit Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[11px] text-white/40 text-center pt-2">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
