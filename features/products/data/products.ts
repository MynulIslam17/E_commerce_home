import { ProductConfig } from '../types/product';

export const PRODUCTS: ProductConfig[] = [
  {
    id: 'sunsilk',
    slug: 'sunsilk-heat-protect-serum',
    brand: 'Sunsilk',
    name: 'Style & Heat Protect Super Serum',
    shortName: 'Super Serum',
    category: 'Thermal Protection & Shine',
    price: '$14.99',
    volume: '100ml',
    tagline: 'Peptide-Repair Complex 10% • 100% Multi-Protection',
    heroHeadline: {
      leftLine1: 'Pure',
      leftLine2: 'Silk',
      rightLine1: 'Thermal',
      rightLine2: 'Shield'
    },
    description:
      'Engineered with a potent 10% Peptide-Repair Complex. Forms an invisible crystalline micro-barrier that shields hair cuticles against heat styling up to 230°C while infusing brilliant glass-like shine.',
    awardBadge: {
      title: 'SALON FORMULA AWARDS',
      subtitle: 'PEPTIDE TECH 2025'
    },
    theme: {
      bgInner: '#b45309', // Warm amber / liquid gold
      bgMid: '#78350f',   // Deep warm cognac
      bgOuter: '#190a03', // Dark espresso obsidian
      accent: '#fde047',  // Radiant champagne gold
      accentText: '#1c1002',
      accentGlow: 'rgba(245, 158, 11, 0.4)',
      badgeBorder: 'rgba(251, 191, 36, 0.3)',
      badgeBg: 'rgba(251, 191, 36, 0.1)'
    },
    image: '/images/products/sunsilk_amber.png',
    floatingIngredients: [
      {
        id: 'sn-drop-1',
        name: 'Golden Serum Droplet',
        image: '/images/ingredients/golden_drop.png',
        size: 135,
        top: '22%',
        left: '32%',
        layer: 'fg',
        opacity: 0.88,
        initialRotation: 15
      },
      {
        id: 'sn-drop-2',
        name: 'Peptide Micro-Sphere',
        image: '/images/ingredients/golden_drop.png',
        size: 95,
        top: '58%',
        left: '42%',
        layer: 'fg',
        opacity: 0.85,
        initialRotation: -20
      },
      {
        id: 'sn-drop-3',
        name: 'Amber Crystal Bead',
        image: '/images/ingredients/golden_drop.png',
        size: 145,
        top: '28%',
        left: '65%',
        layer: 'fg',
        opacity: 0.88,
        initialRotation: 40
      },
      {
        id: 'sn-drop-4',
        name: 'Glowing Serum Capsule',
        image: '/images/ingredients/golden_drop.png',
        size: 110,
        top: '14%',
        left: '50%',
        layer: 'fg',
        opacity: 0.82,
        initialRotation: -10
      },
      {
        id: 'sn-drop-5',
        name: 'Gloss Droplet',
        image: '/images/ingredients/golden_drop.png',
        size: 95,
        top: '74%',
        left: '26%',
        layer: 'fg',
        opacity: 0.85,
        initialRotation: 30
      },
      {
        id: 'sn-drop-6',
        name: 'Thermal Defense Bead',
        image: '/images/ingredients/golden_drop.png',
        size: 125,
        top: '46%',
        left: '71%',
        layer: 'fg',
        opacity: 0.85,
        initialRotation: -45
      },
      {
        id: 'sn-drop-7',
        name: 'Ambient Essence Drop',
        image: '/images/ingredients/golden_drop.png',
        size: 75,
        top: '16%',
        left: '38%',
        layer: 'bg',
        opacity: 0.65,
        initialRotation: 12
      },
      {
        id: 'sn-drop-8',
        name: 'Ambient Essence Drop',
        image: '/images/ingredients/golden_drop.png',
        size: 70,
        top: '52%',
        left: '56%',
        layer: 'bg',
        opacity: 0.55,
        initialRotation: -35
      },
      {
        id: 'sn-drop-9',
        name: 'Ambient Essence Drop',
        image: '/images/ingredients/golden_drop.png',
        size: 80,
        top: '82%',
        left: '36%',
        layer: 'bg',
        opacity: 0.6,
        initialRotation: 25
      }
    ],
    keyIngredients: [
      {
        name: '10% Peptide-Repair Complex',
        concentration: '10% Active Biomimetic Matrix',
        role: 'Structural Hair Bond Reinforcement',
        details: 'Penetrates porous keratin chains to seal cuticle micro-tears caused by thermal flat irons, curling wands, and environmental stressors.'
      },
      {
        name: 'Thermal Shield Silicones & Polymers',
        concentration: 'Heat Defending Formula',
        role: 'Thermal Breakdown Prevention',
        details: 'Creates a weightless thermal barrier resistant up to 230°C (450°F), dramatically reducing heat styling friction and split ends.'
      },
      {
        name: 'Light-Reflecting Micro-Prisms',
        concentration: 'High-Gloss Finishing Actives',
        role: 'Glass-Hair Luminosity',
        details: 'Enhances surface refractive index, delivering mirror-like light reflectance and 48-hour anti-frizz humidity defense.'
      }
    ],
    benefits: [
      {
        title: 'Thermal Multi-Protection',
        description: 'Complete 100% defense against blow-dryers, straighteners, and UV rays without weighing down fine hair.',
        metric: 'Up to 230°C',
        iconName: 'Flame'
      },
      {
        title: 'Keratin Bond Reinforcement',
        description: 'Targeted peptide chain fortification restores elasticity and tensile strength to heat-stressed strands.',
        metric: '10% Complex',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Silky High-Gloss Polish',
        description: 'Transforms dry, rebellious flyaways into liquid silk with a featherlight, non-greasy dry touch finish.',
        metric: '3X Shine Boost',
        iconName: 'Sparkles'
      },
      {
        title: 'Instant Cuticle Smoothing',
        description: 'Instantly locks out environmental humidity for sleek, smooth styling that stays in place all day.',
        metric: '48H Anti-Frizz',
        iconName: 'Wind'
      }
    ],
    usageInstructions: [
      'Dispense 2 to 3 pumps into palms depending on hair length and density.',
      'Warm between palms and evenly distribute through damp hair from mid-lengths to ends before blow-drying.',
      'Reapply half a pump onto dry styled hair for instant glass-like radiance and flyaway control.'
    ],
    reviews: [
      {
        id: 'rev-sn-1',
        author: 'Elena Vance',
        role: 'Senior Master Stylist, Atelier Belle',
        rating: 5,
        comment: 'This super serum completely transformed our blowouts. The 10% peptide complex leaves zero residue while giving client hair a genuine glass-like shine.',
        verified: true
      },
      {
        id: 'rev-sn-2',
        author: 'Chloe Simmons',
        role: 'Verified Buyer',
        rating: 5,
        comment: 'I heat style almost every day, and my ends were brittle. Within one week of using Sunsilk Super Serum, my split ends look sealed and hair feels like silk.',
        verified: true
      },
      {
        id: 'rev-sn-3',
        author: 'Maya Lin',
        role: 'Beauty Editor',
        rating: 5,
        comment: 'The scent, the slip, and the heat protection are top tier. Rivals luxury salon serums at quadruple the price.',
        verified: true
      }
    ],
    packagingSpecs: {
      formulaType: 'Non-Greasy Liquid Gold Serum',
      actives: '10% Peptide-Repair Complex',
      suitableFor: 'All Hair Types & Heat-Styled Strands',
      protectionLevel: '100% Thermal & Frizz Defense'
    }
  },
  {
    id: 'parachute',
    slug: 'parachute-advansed-aloe-vera-coconut-oil',
    brand: 'Parachute Advansed',
    name: 'Aloe Vera Enriched Coconut Hair Oil',
    shortName: 'Aloe Hair Oil',
    category: 'Botanical Hydration & Nourishment',
    price: '$11.99',
    volume: '150ml',
    tagline: 'Aloe Vera & Enriched Coconut • For Soft Nourished Hair',
    heroHeadline: {
      leftLine1: 'Deep',
      leftLine2: 'Nourish',
      rightLine1: 'Pure',
      rightLine2: 'Botanical'
    },
    description:
      'A harmonious botanical synergy of pure soothing Aloe Vera and deep-conditioning coconut oil. Weightlessly penetrates hair fibers to replenish moisture and grant irresistibly soft, bouncy, touchable hair.',
    awardBadge: {
      title: 'BOTANICAL AWARDS',
      subtitle: 'ORGANIC HYDRATION 2025'
    },
    theme: {
      bgInner: '#0284c7', // Deep ocean teal / cyan
      bgMid: '#034b75',   // Rich marine blue
      bgOuter: '#021626', // Midnight sapphire
      accent: '#67e8f9',  // Fresh aquamarine / water blue
      accentText: '#022135',
      accentGlow: 'rgba(56, 189, 248, 0.4)',
      badgeBorder: 'rgba(56, 189, 248, 0.3)',
      badgeBg: 'rgba(56, 189, 248, 0.1)'
    },
    image: '/images/products/parachute_blue.png',
    floatingIngredients: [
      {
        id: 'pc-aloe-1',
        name: 'Fresh Aloe Vera Leaf',
        image: '/images/ingredients/aloe_leaf.png',
        size: 140,
        top: '22%',
        left: '31%',
        layer: 'fg',
        opacity: 0.88,
        initialRotation: -25
      },
      {
        id: 'pc-coco-2',
        name: 'Fresh Coconut Shell',
        image: '/images/ingredients/coconut.png',
        size: 100,
        top: '60%',
        left: '42%',
        layer: 'fg',
        opacity: 0.88,
        initialRotation: 15
      },
      {
        id: 'pc-aloe-3',
        name: 'Aloe Vera Sprout',
        image: '/images/ingredients/aloe_leaf.png',
        size: 145,
        top: '26%',
        left: '66%',
        layer: 'fg',
        opacity: 0.88,
        initialRotation: 35
      },
      {
        id: 'pc-coco-4',
        name: 'Organic Coconut Half',
        image: '/images/ingredients/coconut.png',
        size: 105,
        top: '15%',
        left: '49%',
        layer: 'fg',
        opacity: 0.85,
        initialRotation: -12
      },
      {
        id: 'pc-aloe-5',
        name: 'Aloe Vera Slice',
        image: '/images/ingredients/aloe_leaf.png',
        size: 100,
        top: '76%',
        left: '26%',
        layer: 'fg',
        opacity: 0.85,
        initialRotation: 45
      },
      {
        id: 'pc-coco-6',
        name: 'Hydrating Coconut Flesh',
        image: '/images/ingredients/coconut.png',
        size: 120,
        top: '46%',
        left: '72%',
        layer: 'fg',
        opacity: 0.88,
        initialRotation: -30
      },
      {
        id: 'pc-aloe-7',
        name: 'Ambient Aloe Leaf',
        image: '/images/ingredients/aloe_leaf.png',
        size: 80,
        top: '14%',
        left: '38%',
        layer: 'bg',
        opacity: 0.65,
        initialRotation: 10
      },
      {
        id: 'pc-coco-8',
        name: 'Ambient Coconut Fragment',
        image: '/images/ingredients/coconut.png',
        size: 70,
        top: '52%',
        left: '54%',
        layer: 'bg',
        opacity: 0.6,
        initialRotation: -40
      },
      {
        id: 'pc-aloe-9',
        name: 'Ambient Aloe Leaf',
        image: '/images/ingredients/aloe_leaf.png',
        size: 85,
        top: '82%',
        left: '34%',
        layer: 'bg',
        opacity: 0.65,
        initialRotation: 20
      }
    ],
    keyIngredients: [
      {
        name: 'Pure Soothing Aloe Vera',
        concentration: 'Fresh Botanical Extract',
        role: 'Deep Hydration & Scalp Soothing',
        details: 'Rich in proteolytic enzymes, vitamins A, C, and E to quench parched hair cuticles and promote soft, silky hair texture.'
      },
      {
        name: 'Enriched Coconut Hair Oil',
        concentration: 'Lauric Acid Triglycerides',
        role: 'Core Lipid Penetration',
        details: 'Natural low molecular weight enables 10x deeper penetration into the hair shaft than standard oils, preventing protein loss.'
      },
      {
        name: 'Light-Conditioning Moisture Seal',
        concentration: 'Weightless Lipid Blend',
        role: 'Non-Sticky Softness',
        details: 'Custom non-greasy formulation gives all the nourishing benefits of traditional coconut oil without any heavy post-wash residue.'
      }
    ],
    benefits: [
      {
        title: 'Deep Moisture Quench',
        description: 'Aloe vera delivers an immediate hydration boost to dry strands, revitalizing dull and thirsty hair.',
        metric: '5X Softer Hair',
        iconName: 'Droplets'
      },
      {
        title: 'Weightless Non-Sticky Slip',
        description: 'Modern botanical formula absorbs effortlessly, leaving your hair feeling lightweight, bouncy, and clean.',
        metric: 'Zero Stickiness',
        iconName: 'Feather'
      },
      {
        title: 'Strengthens From Root to Tip',
        description: 'Enriched coconut lipids penetrate the hair cortex to reduce breakage and fortify against split ends.',
        metric: '90% Less Breakage',
        iconName: 'HeartPulse'
      },
      {
        title: 'Natural Scalp Comfort',
        description: 'Calms and rebalances the scalp microbiome with aloe vera’s cooling, anti-inflammatory properties.',
        metric: '100% Botanical Care',
        iconName: 'Flower2'
      }
    ],
    usageInstructions: [
      'Take a generous amount in your palms and gently massage into the scalp using circular motions.',
      'Work through hair lengths down to the tips to coat each strand in nourishing moisture.',
      'Leave on for 30–45 minutes (or overnight) before washing with a gentle shampoo for irresistibly soft hair.'
    ],
    reviews: [
      {
        id: 'rev-pc-1',
        author: 'Ayesha Rahman',
        role: 'Natural Hair Enthusiast',
        rating: 5,
        comment: 'I usually hate the heaviness of hair oils, but this Aloe Vera blend from Parachute is unbelievable. Softest hair I have ever had!',
        verified: true
      },
      {
        id: 'rev-pc-2',
        author: 'Dr. Priya Sen',
        role: 'Trichologist & Dermatologist',
        rating: 5,
        comment: 'The combination of coconut oil triglycerides and aloe polysaccharides is scientifically ideal for repairing damaged hair cuticle scales.',
        verified: true
      },
      {
        id: 'rev-pc-3',
        author: 'Nadia Khan',
        role: 'Verified Customer',
        rating: 5,
        comment: 'Lightweight, smells like a luxury spa, and leaves my hair tangle-free without any oily look.',
        verified: true
      }
    ],
    packagingSpecs: {
      formulaType: 'Ultra-Lightweight Enriched Oil',
      actives: 'Pure Aloe Vera & Deep Coconut Oil',
      suitableFor: 'Dry, Dull, & Thirsty Strands',
      protectionLevel: 'Long-Lasting Botanical Softness'
    }
  }
];

export const DEFAULT_PRODUCT = PRODUCTS[0]; // Sunsilk is primary hero
