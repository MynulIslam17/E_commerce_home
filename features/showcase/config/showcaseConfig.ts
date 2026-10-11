export interface ChapterData {
  id: string;
  num: string;
  kicker: string;
  title: string;
  description: string;
  accent: string;
  rotationY: number; // in radians
  rotationX?: number;
  bottleScale?: number;
  cameraZ?: number;
  yOffset?: number;
}

export interface BottleSizeOption {
  id: string;
  volume: string;
  title: string;
  price: number;
  scale: number;
  popular?: boolean;
}

export interface ShowcaseConfig {
  product: {
    brand: string;
    subBrand: string;
    name: string;
    fullTitle: string;
    category: string;
    volume: string;
    modelPath: string;
    heroImage: string;
    kicker: string;
    lede: string;
    atelierLocation: string;
    batchSize: number;
    concentration: string;
  };
  sizes: BottleSizeOption[];
  chapters: ChapterData[];
  shaderWords: string[];
  tints: string[];
  specs: {
    label: string;
    value: string;
  }[];
  formulaRows: {
    tier: 'Top' | 'Heart' | 'Base';
    name: string;
    origin: string;
    percentage: string;
  }[];
}

export const SHOWCASE_CONFIG: ShowcaseConfig = {
  product: {
    brand: 'LUMINA',
    subBrand: 'HAIR ATELIER',
    name: 'VERA',
    fullTitle: 'VERA Hydra Serum',
    category: 'Cellular Hair Elixir',
    volume: '100 ml',
    modelPath: '/models/vera_hydra_serum.glb',
    heroImage: '/images/products/sunsilk_amber.png',
    kicker: 'Bio-Cellular Hair Elixir · Zürich Atelier',
    lede: 'One singular restorative formulation, blended by master cosmetic chemists in numbered micro-batches of 300.',
    atelierLocation: 'Atelier Limmatquai 18, Zürich · Switzerland',
    batchSize: 300,
    concentration: '28% Active Complex',
  },
  sizes: [
    {
      id: '50ml',
      volume: '50 ml',
      title: 'Studio Flacon',
      price: 85,
      scale: 0.85,
    },
    {
      id: '100ml',
      volume: '100 ml',
      title: 'Grand Flacon (Refillable)',
      price: 135,
      scale: 1.0,
      popular: true,
    },
    {
      id: '15ml',
      volume: '15 ml',
      title: 'Atelier Travel Pipette',
      price: 32,
      scale: 0.58,
    },
  ],
  chapters: [
    {
      id: 'hero',
      num: '00',
      kicker: 'Lumina Atelier · Switzerland',
      title: 'VERA Hydra Serum',
      description: 'Hand-blended cellular hydration elixir for dry, damaged, or heat-styled hair.',
      accent: '#f59e0b',
      rotationY: 0,
      rotationX: 0.05,
      bottleScale: 1.0,
      cameraZ: 6.8,
      yOffset: 0,
    },
    {
      id: 'chapter-nectar',
      num: '01',
      kicker: 'Top Active Phase',
      title: 'Liquid Amber Nectar',
      description: 'Golden cold-pressed abyssinian seed lipids, fermented camellia essence, and micro-refined plant squalane. Opens bright and weightless, smoothing cuticles instantly.',
      accent: '#fbbf24',
      rotationY: Math.PI * 0.65,
      rotationX: -0.05,
      bottleScale: 1.02,
      cameraZ: 6.5,
      yOffset: -0.05,
    },
    {
      id: 'chapter-cellular',
      num: '02',
      kicker: 'Heart Matrix Phase',
      title: 'Cellular Aloe Biome',
      description: 'Concentrated pure aloe vera leaf mucilage complex bound with vegetal keratin. Deep intercellular penetration restoring natural moisture equilibrium for 72 hours.',
      accent: '#34d399',
      rotationY: Math.PI * 1.35,
      rotationX: 0.08,
      bottleScale: 1.04,
      cameraZ: 6.4,
      yOffset: 0.04,
    },
    {
      id: 'chapter-shield',
      num: '03',
      kicker: 'Base Thermal Shield',
      title: 'Atlas Cedar & Silk Resin',
      description: 'High-molecular-weight Moroccan atlas cedarwood oil and vegan silk amino peptides forming an invisible thermal shield resilient up to 230°C.',
      accent: '#f97316',
      rotationY: Math.PI * 2.0,
      rotationX: 0.0,
      bottleScale: 1.0,
      cameraZ: 6.6,
      yOffset: 0,
    },
  ],
  shaderWords: ['LUMINA', 'VERA', 'HYDRA', 'CELLULAR'],
  tints: ['#160b03', '#3a1e05', '#12261e', '#1c1006'],
  specs: [
    { label: 'Bottles per batch', value: '300' },
    { label: 'Bio-active complex', value: '28%' },
    { label: 'Maceration period', value: '4 weeks' },
    { label: 'Heat protection', value: 'Up to 230°C' },
  ],
  formulaRows: [
    {
      tier: 'Top',
      name: 'Cold-pressed Abyssinian Lipids & Plant Squalane',
      origin: 'Ethiopian Highlands · Andalusia',
      percentage: '35%',
    },
    {
      tier: 'Heart',
      name: 'Pure Bio-Fermented Aloe Mucilage & Vegetal Keratin',
      origin: 'Curacao · Grasse Bio-Laboratory',
      percentage: '45%',
    },
    {
      tier: 'Base',
      name: 'Atlas Cedarwood Resin & Silk Amino Peptides',
      origin: 'Moroccan Atlas Mountains · Kyoto',
      percentage: '20%',
    },
  ],
};
