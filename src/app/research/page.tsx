"use client";

import React from "react";
import ResearchHero from "@/components/sections/research-hero";
import ResearchSolutions from "@/components/sections/research-solutions";
import TerritoryFooter from "@/components/sections/territory-footer";
import { FadeInSection } from "@/components/ui/fade-in-section";

export default function ResearchPage() {
  return (
    <main className="bg-secondary min-h-screen">
      <ResearchHero />
      <FadeInSection>
        <ResearchSolutions />
      </FadeInSection>
      <FadeInSection>
        <TerritoryFooter />
      </FadeInSection>
    </main>
  );
}
