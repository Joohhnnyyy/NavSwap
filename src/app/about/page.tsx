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
import Footer from "@/components/sections/footer";

export default function AboutPage() {
  return (
    <main className="bg-[#F1F1F1] min-h-screen">
      <Header />
      <AboutHero />
      <AboutConcept />
      <DynamicLogoSection />
      <ShiftTicker />
      <TeamList />
      <AboutGallery />
      <JoinUs />
      <Footer />
    </main>
  );
}
