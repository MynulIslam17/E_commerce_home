import React from 'react';
import { HeroProductsShowcase } from '@/features/home/components/HeroProductsShowcase';
import { IngredientsSection } from '@/features/home/components/IngredientsSection';
import { BenefitsSection } from '@/features/home/components/BenefitsSection';
import { ReviewsSection } from '@/features/home/components/ReviewsSection';
import { ContactSection } from '@/features/home/components/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroProductsShowcase />
      <IngredientsSection />
      <BenefitsSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
