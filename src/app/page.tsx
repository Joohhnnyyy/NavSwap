"use client";

import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import WhatWeDo from "@/components/sections/what-we-do";
import FeaturedList from "@/components/sections/featured-list";
import TerritoryFooter from "@/components/sections/territory-footer";
import { FadeInSection } from "@/components/ui/fade-in-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <FadeInSection>
          <HeroSection />
        </FadeInSection>
        <FadeInSection>
          <WhatWeDo />
        </FadeInSection>
        <FadeInSection>
          <FeaturedList />
        </FadeInSection>
        <FadeInSection>
          <TerritoryFooter />
        </FadeInSection>
      </main>
    </div>
  );
}
