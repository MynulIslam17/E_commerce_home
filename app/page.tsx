import React from 'react';
import { ShowcaseStage } from '@/features/showcase/components/ShowcaseStage';
import { AtelierSection } from '@/features/editorial/components/AtelierSection';
import { FormulaSection } from '@/features/editorial/components/FormulaSection';
import { WearingSection } from '@/features/editorial/components/WearingSection';
import { CollectionSection } from '@/features/editorial/components/CollectionSection';
import { StockistsSection } from '@/features/editorial/components/StockistsSection';

export default function HomePage() {
  return (
    <>
      <ShowcaseStage />
      <AtelierSection />
      <FormulaSection />
      <WearingSection />
      <CollectionSection />
      <StockistsSection />
    </>
  );
}
