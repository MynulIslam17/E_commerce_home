'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ProductConfig } from '../types/product';
import { PRODUCTS, DEFAULT_PRODUCT } from '../data/products';

interface ProductContextType {
  products: ProductConfig[];
  activeProduct: ProductConfig;
  activeId: 'sunsilk' | 'parachute';
  isSwitching: boolean;
  switchProduct: (id: 'sunsilk' | 'parachute') => void;
  nextProduct: () => void;
  prevProduct: () => void;
  setIsSwitching: (switching: boolean) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<'sunsilk' | 'parachute'>('sunsilk');
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  const activeProduct = useMemo(() => {
    return PRODUCTS.find((p) => p.id === activeId) || DEFAULT_PRODUCT;
  }, [activeId]);

  const switchProduct = useCallback(
    (id: 'sunsilk' | 'parachute') => {
      if (id === activeId || isSwitching) return;
      setActiveId(id);
    },
    [activeId, isSwitching]
  );

  const nextProduct = useCallback(() => {
    if (isSwitching) return;
    const currentIndex = PRODUCTS.findIndex((p) => p.id === activeId);
    const nextIndex = (currentIndex + 1) % PRODUCTS.length;
    setActiveId(PRODUCTS[nextIndex].id);
  }, [activeId, isSwitching]);

  const prevProduct = useCallback(() => {
    if (isSwitching) return;
    const currentIndex = PRODUCTS.findIndex((p) => p.id === activeId);
    const prevIndex = (currentIndex - 1 + PRODUCTS.length) % PRODUCTS.length;
    setActiveId(PRODUCTS[prevIndex].id);
  }, [activeId, isSwitching]);

  const value = useMemo(
    () => ({
      products: PRODUCTS,
      activeProduct,
      activeId,
      isSwitching,
      switchProduct,
      nextProduct,
      prevProduct,
      setIsSwitching,
    }),
    [activeProduct, activeId, isSwitching, switchProduct, nextProduct, prevProduct]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useActiveProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useActiveProduct must be used within a ProductProvider');
  }
  return context;
}
