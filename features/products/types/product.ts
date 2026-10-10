export interface FloatingIngredientItem {
  id: string;
  name: string;
  image: string;
  size: number; // width in px
  top: string; // percentage or rem
  left: string; // percentage or rem
  layer: 'bg' | 'fg' | 'leaves';
  opacity?: number;
  initialRotation?: number;
}

export interface ProductTheme {
  bgInner: string;
  bgMid: string;
  bgOuter: string;
  accent: string;
  accentText: string;
  accentGlow: string;
  badgeBorder: string;
  badgeBg: string;
}

export interface ProductBenefit {
  title: string;
  description: string;
  metric: string;
  iconName: string;
}

export interface KeyIngredient {
  name: string;
  concentration?: string;
  role: string;
  details: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export interface ProductConfig {
  id: 'sunsilk' | 'parachute';
  slug: string;
  brand: string;
  name: string;
  shortName: string;
  category: string;
  price: string;
  tagline: string;
  volume: string;
  heroHeadline: {
    leftLine1: string;
    leftLine2: string;
    rightLine1: string;
    rightLine2: string;
  };
  description: string;
  awardBadge: {
    title: string;
    subtitle: string;
  };
  theme: ProductTheme;
  image: string;
  floatingIngredients: FloatingIngredientItem[];
  keyIngredients: KeyIngredient[];
  benefits: ProductBenefit[];
  usageInstructions: string[];
  reviews: ReviewItem[];
  packagingSpecs: {
    formulaType: string;
    actives: string;
    suitableFor: string;
    protectionLevel: string;
  };
}
