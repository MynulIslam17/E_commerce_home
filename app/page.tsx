import React from 'react';
import { HeroSection } from '@/features/home/components/HeroSection';
import { ProductsSection } from '@/features/home/components/ProductsSection';
import { IngredientsSection } from '@/features/home/components/IngredientsSection';
import { BenefitsSection } from '@/features/home/components/BenefitsSection';
import { ReviewsSection } from '@/features/home/components/ReviewsSection';
import { ContactSection } from '@/features/home/components/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <IngredientsSection />
      <BenefitsSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
