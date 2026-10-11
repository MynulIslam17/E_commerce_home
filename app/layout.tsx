import type { Metadata } from 'next';
import './globals.css';
import { ProductProvider } from '@/features/products/context/ProductContext';
import { Navbar } from '@/components/ui/Navbar';
import { BubblesBackground } from '@/features/home/components/BubblesBackground';
import { Footer } from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'LUMINA · VERA Hydra Serum | Bio-Cellular Hair Elixir',
  description:
    'Single-product 3D showcase for VERA Hydra Serum. Poured by hand in micro-batches of 300 at Atelier Limmatquai, Zürich.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Castoro:ital@0;1&family=Red+Hat+Text:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Satisfy&family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen relative antialiased selection:bg-[#f59e0b] selection:text-[#141412] bg-[#0c0a09] text-white">
        <Navbar />
        <main id="main" className="relative z-10 w-full block">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
