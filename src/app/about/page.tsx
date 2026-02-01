"use client";

import React from "react";
import Header from "@/components/sections/header";
import AboutHero from "@/components/sections/about-hero";
import AboutConcept from "@/components/sections/about-concept";
import DynamicLogoSection from "@/components/sections/dynamic-logo";
import ShiftTicker from "@/components/sections/shift-ticker";
import TeamList from "@/components/sections/team-list";
import AboutGallery from "@/components/sections/about-gallery";
import JoinUs from "@/components/sections/join-us";
import TerritoryFooter from "@/components/sections/territory-footer";
import { FadeInSection } from "@/components/ui/fade-in-section";

export default function AboutPage() {
  return (
    <main className="bg-secondary min-h-screen">
      <Header />
      <AboutHero />
      <FadeInSection>
        <AboutConcept />
      </FadeInSection>
      <FadeInSection>
        <DynamicLogoSection />
      </FadeInSection>
      <FadeInSection>
        <ShiftTicker />
      </FadeInSection>
      <FadeInSection>
        <TeamList />
      </FadeInSection>
      <FadeInSection>
        <AboutGallery />
      </FadeInSection>
      <FadeInSection>
        <JoinUs />
      </FadeInSection>
      <FadeInSection>
        <TerritoryFooter />
      </FadeInSection>
    </main>
  );
}
