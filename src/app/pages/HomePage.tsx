import React from "react";
import { Hero } from "../components/Hero";
import { Categories } from "../components/Categories";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { ThematicProducts } from "../components/ThematicProducts";
import { ArtistRegistration } from "../components/ArtistRegistration";
import { Features } from "../components/Features";
import { Newsletter } from "../components/Newsletter";

export function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <ThematicProducts />
      <ArtistRegistration />
      <Features />
      <Newsletter />
    </>
  );
}
