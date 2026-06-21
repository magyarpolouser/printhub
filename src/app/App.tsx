import React from "react";
import { MegaMenu } from './components/MegaMenu';
import { AnimatedLights } from './components/AnimatedLights';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ThematicProducts } from './components/ThematicProducts';
import { ArtistRegistration } from './components/ArtistRegistration';
import { Features } from './components/Features';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <AnimatedLights />
      <MegaMenu />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <ThematicProducts />
      <ArtistRegistration />
      <Features />
      <Newsletter />
      <Footer />
    </div>
  );
}