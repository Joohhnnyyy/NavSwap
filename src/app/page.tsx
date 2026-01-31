"use client";

import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import WhatWeDo from "@/components/sections/what-we-do";
import FeaturedList from "@/components/sections/featured-list";
import TerritoryFooter from "@/components/sections/territory-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      <Header />
      <main>
        <HeroSection />
        <WhatWeDo />
        <FeaturedList />
        <TerritoryFooter />
      </main>
    </div>
  );
}
