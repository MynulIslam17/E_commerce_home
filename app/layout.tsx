import type { Metadata } from 'next';
import './globals.css';
import { ProductProvider } from '@/features/products/context/ProductContext';
import { Navbar } from '@/components/ui/Navbar';
import { BubblesBackground } from '@/features/home/components/BubblesBackground';
import { Footer } from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'LUMINA | Premium Animated Hair Care Product Experience',
  description:
    'An immersive interactive showcase for Sunsilk Style & Heat Protect Super Serum and Parachute Advansed Aloe Vera Enriched Coconut Hair Oil. Inspired by GetLayers Soda design language.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Satisfy&family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen relative antialiased selection:bg-amber-400 selection:text-black">
        <ProductProvider>
          <BubblesBackground />
          <Navbar />
          <main className="relative z-10 w-full block">{children}</main>
          <Footer />
        </ProductProvider>
      </body>
    </html>
  );
}
