"use client";

import React from "react";
import Header from "@/components/sections/header";
import ResearchHero from "@/components/sections/research-hero";
import ResearchItem3DMix from "@/components/sections/research-item-3dmix";
import ResearchItemLogoBuilder from "@/components/sections/research-item-logo-builder";
import ResearchArchive from "@/components/sections/research-item-low-poly";
import Footer from "@/components/sections/footer";

export default function ResearchPage() {
  return (
    <main className="bg-[#F2F2F2] min-h-screen">
      <Header />
      <ResearchHero />
      <ResearchItem3DMix />
      <ResearchItemLogoBuilder />
      <ResearchArchive />
      <Footer />
    </main>
  );
}
